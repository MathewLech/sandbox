from channels.layers import get_channel_layer
from django.conf import settings

import asyncio
import os
import time

async def main():
    redis_host = os.environ.get('REDIS_HOST', 'localhost')
    settings.configure(CHANNEL_LAYERS = {
                "default": {
                # This example app uses the Redis channel layer implementation channels_redis
                "BACKEND": "channels_redis.core.RedisChannelLayer",
                "CONFIG": {
                    "hosts": [(redis_host, 6379)],
                },
                },
            })
            
    channel_layer = get_channel_layer()
    init_text = "HI FROM THE ADMIN"
    incr = 0
    while True:
        await channel_layer.group_send(
                "streamchannel-1",
                {
                    "type": "stream.message",
                    "stream_id": 1,
                    "username": "Admin",
                    "message": init_text,
                }
            )

        time.sleep(3)
        incr = incr + 1
        init_text = str(incr)
        


if __name__== "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())