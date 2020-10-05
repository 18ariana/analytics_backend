import datetime

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from model_clone import CloneMixin
from django.contrib.postgres.fields import ArrayField

from dataprocessing.models import Items

class UserExpertise(models.Model):
    STUFF_STATUS_CHOICES = [
        ('LE', 'Руководитель'),
        ('EX', 'Эксперт'),
    ]
    expert = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Эксперт', on_delete=models.CASCADE)
    expertise = models.ForeignKey('Expertise', verbose_name='Экспертиза', on_delete=models.CASCADE)
    stuff_status = models.CharField(choices=STUFF_STATUS_CHOICES, max_length=1024, verbose_name="Роль эксперта")
    expert_result = models.CharField(verbose_name="Результаты экспертизы", max_length=50000,blank=True, null=True)

class Expertise(models.Model):
    STATUS_CHOICES = [
        ('WK', 'В работе'),
        ('EX', 'На экспертизе'),
        ('AC', 'Одобрено'),
        ('AR', 'Архив')
    ]
    work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE)
    educational_program = models.ForeignKey('EducationalProgram', on_delete=models.CASCADE,default=None,null=True )
    expertise_status = models.CharField(choices=STATUS_CHOICES, max_length=1024, verbose_name="Статус экспертизы")
    experts = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name='Эксперты', through=UserExpertise)

class ExpertiseComments(models.Model):
    BLOCK_CHOICES = [
        ('MA', 'Главное'),
        ('PR', 'Пререквизиты'),
        ('SE', 'Разделы'),
        ('TH', 'Темы'),
        ('SO', 'Источники'),
        ('EV', 'Оценчные средства'),
        ('RE', 'Результаты обучения'),
    ]
    comment_block = models.CharField(choices=BLOCK_CHOICES, max_length=1024, verbose_name="Блок комментария")
    user_expertise = models.ForeignKey('UserExpertise', on_delete=models.CASCADE)
    comment_text = models.CharField(max_length=50000, verbose_name="Комментарий")
    comment_date = models.DateTimeField(auto_now_add=True, blank=True, verbose_name='Дата комментария')
