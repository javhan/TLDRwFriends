from django.db.models import fields
from rest_framework import serializers, response, status
from users.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('bio', 'email', 'first_name', 'id', 'last_name', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length' : 6, 'required': True}}

    def create(self, validated_data):
        """ augment UserSerializer to hash password """
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        
        """ validating and saving the data that has been changed """    
        user.save()

        return user
    