from django.urls import path

from channels.http import AsgiHandler
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

from MyAPI.consumers import StreamConsumer
from backend.token_auth import TokenAuthMiddlewareStack

# The channel routing defines what connections get handled by what consumers,
# selecting on either the connection type (ProtocolTypeRouter) or properties
# of the connection's scope (like URLRouter, which looks at scope["path"])
# For more, see http://channels.readthedocs.io/en/latest/topics/routing.html
application = ProtocolTypeRouter({

    # Channels will do this for you automatically. It's included here as an example.
    # "http": AsgiHandler,

    # Route all WebSocket requests to our custom streamcahnnel handler.
    # We actually don't need the URLRouter here, but we've put it in for
    # illustration. Also note the inclusion of the TokenAuthMiddlewareStack to
    # this is a custom handler to handle a basic auth token from websocket 
    # for authentication
    
        "websocket": TokenAuthMiddlewareStack(
        URLRouter([
            # URLRouter just takes standard Django path() or url() entries.
            path("myapi/stream/", StreamConsumer),
        ]),
    ),

})

