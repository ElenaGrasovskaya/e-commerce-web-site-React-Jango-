# Generated by Django 3.2.9 on 2021-12-20 14:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_alter_product_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='createAt',
            new_name='createdAt',
        ),
    ]