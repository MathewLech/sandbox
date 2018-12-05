from channels.auth import AuthMiddlewareStack
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser
from channels.middleware import BaseMiddleware
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer

class JwtTokenAuthMiddleware(BaseMiddleware):
    """
    JWT token authorization middleware for Django Channels 2
    """

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):        
        try:
            #for now we pass a token as a url param on the websocket
            query = dict((x.split('=') for x in scope['query_string'].decode().split("&")))
            #pull token from url param
            token = query['token']     
            data = {'token': token} 
            #set user in the scope, channels will look to this to make sure                       
            valid_data = VerifyJSONWebTokenSerializer().validate(data)        
            user = valid_data['user']
            scope['user'] = user
        except:
            scope['user'] = AnonymousUser()
        return self.inner(scope)

JwtTokenAuthMiddlewareStack = lambda inner: JwtTokenAuthMiddleware(AuthMiddlewareStack(inner))