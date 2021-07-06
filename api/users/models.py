from datetime import datetime

from django.db import models

TOKEN_ACTIVE = 'active'
TOKEN_EXPIRED = 'expired'
TOKEN_STATUSES = (
    (TOKEN_ACTIVE, TOKEN_ACTIVE),
    (TOKEN_EXPIRED, TOKEN_EXPIRED)
)


class ArgyleUser(models.Model):
    argyle_id = models.UUIDField(unique=True)
    token_expiry = models.IntegerField(null=True, blank=True)
    token_status = models.CharField(blank=True, null=True, choices=TOKEN_STATUSES, max_length=10)
    email = models.EmailField()
    first_name = models.CharField(blank=True, null=True, max_length=50)
    last_name = models.CharField(blank=True, null=True, max_length=50)
    full_name = models.CharField(blank=True, null=True, max_length=100)

    def save(self, *args, **kwargs):
        self.full_name = f"{self.first_name} {self.last_name}"

        now_timestamp = datetime.timestamp(datetime.now())
        self.token_status = TOKEN_ACTIVE if self.token_expiry > now_timestamp else TOKEN_EXPIRED

        super(ArgyleUser, self).save(*args, **kwargs)
