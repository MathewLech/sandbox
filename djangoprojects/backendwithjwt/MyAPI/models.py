from django.db import models


class StreamChannel(models.Model):
    """
    A Channel for clients to subscribe to
    """

    # StreamChannel title
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

    @property
    def group_name(self):
        """
        Returns the Channels Group name that sockets should subscribe to to get sent
        messages as they are generated.
        """
        return "streamchannel-%s" % self.id