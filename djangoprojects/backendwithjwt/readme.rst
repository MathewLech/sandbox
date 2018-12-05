My API
======

Some boiler plate for create a create a django based rest api using jwt for views and
basic token auth for a websockets (django channels)
--------------------------------------------------------------------------------------

Manual installation and Set up
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Make a new virtualenv for the project, and run::

    pip install -r requirements.txt

Then, you'll need Redis running locally; the settings are configured to
point to ``localhost``, port ``6379``, but you can change this in the
``CHANNEL_LAYERS`` setting in ``settings.py``.

Finally, run::

    python manage.py migrate
    python manage.py runserver

Usage
-----

Make yourself a superuser account::

    python manage.py createsuperuser

Then, log into http://localhost:8000/admin/ and make a stream channel object.


-------------------Websocket test-----------------------------
then make a token for this user to use in the websocket

Then to test the external server. Once Django server and redis is up. You can start
the testexternalserver.py by running python testexternalserver.py  in a new command window under the 
same virtual env.

then in chrome dev tools you can run the following 

var exampleSocket = new WebSocket("ws://localhost:8000/myapi/stream/?token=[your token here remove brackets as well]");

exampleSocket.onmessage = function (event) {
console.log(event.data);
}

you should see in the console log messages from your external test server

-------------------rest api jwt test-----------------------------
got to http://localhost:8000/api-token-auth/ 
enter creds to recieve jwt
you can go to the following http://localhost:8000/testing/ in the browser to see access is denied
Then use post man and put this in the get request http://localhost:8000/testing/
then go to headers and create a key called Authorization with a value of JWT [your token here]
hit send 
you should see a response back that says
{
    "Message": "This is a protected get"
}




Future Considerations
-------------------------
Update the way a websocket authenticates. Not a huge fan of passing the token via url params


Further Reading
---------------
You can find the Channels documentation at http://channels.readthedocs.org