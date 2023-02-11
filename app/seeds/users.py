from app.models import db, User, environment, SCHEMA


demo = User(
    username='Demo', email='demo@aa.io', password='password')
roysa = User(
    username='roysa', email='roysa@aa.io', password='password')
jason = User(
    username='jason', email='jason@aa.io', password='password')
ryan = User(
    username="ryan", email="ryan@aa.io", password="password")
lillyann = User(
    username="lillyann", email="lillyann@aa.io", password="password")

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
