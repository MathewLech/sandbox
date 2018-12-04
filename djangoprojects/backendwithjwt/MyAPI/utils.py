from channels.db import database_sync_to_async

from .exceptions import ClientError
from .models import StreamChannel


# This decorator turns this function from a synchronous function into an async one
# we can call from our async consumers, that handles Django DBs correctly.
# For more, see http://channels.readthedocs.io/en/latest/topics/databases.html
@database_sync_to_async
def get_streamchannel_or_error(room_id, user):
    """
    Tries to fetch a stream channel for the client, checking permissions along the way.
    """
    # Check if the user is logged in
    if not user.is_authenticated:
        raise ClientError("USER_HAS_TO_LOGIN")
    # Find the stream channel they requested (by ID)
    try:
        sc = StreamChannel.objects.get(pk=room_id)
    except StreamChannel.DoesNotExist:
        raise ClientError("STREAMCHANNEL_INVALID")

    return sc