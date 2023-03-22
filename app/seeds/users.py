from app.models import db, User, environment, SCHEMA


demo = User(username='Demo', display_name='Demo', email='demo@aa.io', password='password', profile_image_url='', header_image_url='')
roysa = User(username='Roysa', display_name='razzledazzle', email='roysa@aa.io', password='password', profile_image_url='', header_image_url='')
jason = User(username='Jason', display_name='jasona', email='jason@aa.io', password='password', profile_image_url='', header_image_url='')
ryan = User(username="Ryan", display_name='ryanh', email="ryan@aa.io", password="password", profile_image_url='', header_image_url='')
lillyann = User(username="Lillyann", display_name='angrymidgetelf', email="lillyann@aa.io", password="password", profile_image_url='', header_image_url='')
# michael = User(username='Michael', display_name='mike', email='michael@aa.io', password='password')
# samantha = User(username='Samantha', display_name='sammie', email='samantha@aa.io', password='password')
# maxwell = User(username='Maxwell', display_name='max', email='maxwell@aa.io', password='password')
# julie = User(username='Julie', display_name='jules', email='julie@aa.io', password='password')
# zachary = User(username='Zachary', display_name='zach', email='zachary@aa.io', password='password')
# Adds a demo user, you can add other users here if you want
def seed_users():

    db.session.add(demo)
    db.session.add(roysa)
    db.session.add(jason)
    db.session.add(ryan)
    db.session.add(lillyann)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
