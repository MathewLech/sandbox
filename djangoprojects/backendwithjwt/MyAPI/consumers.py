from django.conf import settings

from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .exceptions import ClientError
from .utils import get_streamchannel_or_error


class StreamConsumer(AsyncJsonWebsocketConsumer):
    """
    This Stream consumer handles websocket connections for 
    clients subsribing to stream and also any processes who want to 
    publish to channel.

    It uses AsyncJsonWebsocketConsumer, which means all the handling functions
    must be async functions, and any sync work (like ORM access) has to be
    behind database_sync_to_async or sync_to_async. For more, read
    http://channels.readthedocs.io/en/latest/topics/consumers.html
    """
    ##### WebSocket event handlers

    async def connect(self):
        """
        Called when the websocket is handshaking as part of initial connection.
        """
        # Are they logged in?
        if self.scope["user"].is_anonymous:
            # Reject the connection
            await self.close()
        else:
            # Accept the connection
            await self.accept()
        # Store which stream_channels the user has joined on this connection
        self.stream_channels = set()
        await self.subscribe_client_to_channel()
        
    async def subscribe_client_to_channel(self):
        stream_channel_id = 1 #we need to look this up from DB

        # The logged-in user is in our scope thanks to the authentication ASGI middleware
        stream_channel = await get_streamchannel_or_error(stream_channel_id, self.scope["user"])
        #make note they have joined this stream
        self.stream_channels.add(stream_channel_id)

        # Add them to the group so they get stream_channel messages
        await self.channel_layer.group_add(
            stream_channel.group_name,
            self.channel_name,
        )

    async def receive_json(self, content):
        """
        Called when we get a text frame. Channels will JSON-decode the payload
        for us and pass it as the first argument.
        """
        try:
            # Messages need to have a "command" key we can switch on
            command = content.get("command", None)
            if command == "send":
                await self.send_stream(content["stream_id"], content["message"])
            elif command == "leave":
                # Leave the stream
                await self.leave_stream(content["stream_id"])
        except ClientError as e:
            # Catch any errors and send it back
            await self.send_json({"error": e.code})

    async def disconnect(self, code):
        """
        Called when the WebSocket closes for any reason.
        """
        # Leave all the stream channels we are still in
        for stream_id in list(self.stream_channels):
            try:
                await self.leave_stream(stream_id)
            except ClientError:
                pass

    ##### Command helper methods called by receive_json
    async def leave_stream(self, stream_id):
        """
        Called by receive_json when someone sent a leave command.
        """
        # The logged-in user is in our scope thanks to the authentication ASGI middleware
        stream_channel = await get_streamchannel_or_error(stream_id, self.scope["user"])

        # Remove that we're in the stream
        self.stream_channels.discard(stream_id)
        # Remove them from the group so they no longer get stream messages
        await self.channel_layer.group_discard(
            stream_channel.group_name,
            self.channel_name,
        )

        # Instruct their client to finish closing the stream
        await self.send_json({
            "leave": str(stream_channel.id),
        })

    async def send_stream(self, stream_id, message):
        """
        Called by receive_json when a process sends a message to a stream.
        """
        # Check they are in this stream
        if stream_id not in self.stream_channels:
            raise ClientError("STREAM_ACCESS_DENIED")
        # Get the stream and send to the group about it
        stream_channel = await get_streamchannel_or_error(stream_id, self.scope["user"])

        await self.channel_layer.group_send(
            stream_channel.group_name,
            {
                "type": "stream.message",
                "stream_id": stream_id,
                "username": self.scope["user"].username,
                "message": message,
            }
        )

    ##### Handlers for messages sent over the channel layer

    # These helper methods are named by the types we send - so stream.message becomes stream_message

    async def stream_leave(self, event):
        """
        Called when someone has left the stream.
        """
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": settings.MSG_TYPE_LEAVE,
                "stream": event["stream_id"],
                "username": event["username"],
            },
        )

    async def stream_message(self, event):
        """
        Called when a process has sent something to the stream.
        """
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": "msg",
                "stream": event["stream_id"],
                "username": event["username"],
                "message": event["message"],
            },
        )
