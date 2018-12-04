from channels.auth import AuthMiddlewareStack
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser
from channels.middleware import BaseMiddleware

class TokenAuthMiddleware(BaseMiddleware):
    """
    Token authorization middleware for Django Channels 2
    """

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        try:            
            #for now we pass a token as a url param on the websocket
            query = dict((x.split('=') for x in scope['query_string'].decode().split("&")))
            #pull token from url param
            token = query['token']                 
            #lookup token and associated fk user                     
            token = Token.objects.get(key=token)
            #set user in the scope, channels will look to this to make sure
            #its authenticated
            scope['user'] = token.user                  
        except:            
            scope['user'] = AnonymousUser()
        return self.inner(scope)

TokenAuthMiddlewareStack = lambda inner: TokenAuthMiddleware(AuthMiddlewareStack(inner))