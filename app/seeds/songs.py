from app.models import db, Song, environment, SCHEMA
from .users import demo, roysa, ryan, jason, lillyann

def seed_songs():
    # demo_song = Song(user_id=1, title="Roysa is Lame", artist="Leandro's mom", genre="Dubstep", description="This song is about how lame Roysa is because she is so lame", length=4.47, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Doja+Cat+-+MOOO!.mp3", song_image_url="https://images.complex.com/complex/images/c_fill,f_auto,g_center,w_1200/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi", song_likes=[roysa])

    # roysas_song = Song(user_id=2, title="Poopy Ryan", artist="Potato", genre="Trance", description="Ryan's song about a poopy potato salad", length=3.32, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/12_Love_Yourz___HiphopKit.com.mp3", song_image_url="https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/master/pass/Artist-Designed%20Album%20Covers%202.jpg", song_likes=[jason, lillyann, demo])

    # jasons_song = Song(user_id=3,title="Your mom", artist="Your grandma", genre="Trap", description="Yo mama", length=3.59, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/R%C3%9CF%C3%9CS+DU+SOL+-+You+Were+Right.mp3",song_image_url="https://cdn.shopify.com/s/files/1/0065/3069/5257/products/webMODYL12121589_2000x.jpg?v=1626183421", song_likes=[roysa,lillyann,jason,demo,ryan])

    # ryans_song = Song(user_id=4, title="SandStorm", artist="Darude", genre="Electronic", description="The classic Darude - Sandstorm", length=3.54, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Darude+-+Sandstorm.mp3", song_image_url="https://admin.itsnicethat.com/images/ESgAg6Y2f2xM_pfPIsyL0pvdQHg=/69898/format-webp%7Cwidth-2880/598196e77fa44cb08200a23e.jpg", song_likes=[jason, demo, lillyann])

    # lillyanns_song = Song(user_id=5,title="Kill Bill", artist="SZA", genre="Trap", description="Yo mama", length=4.36, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/SZA_-_Kill_Bill_Official_Video.mp3",song_image_url="https://i1.sndcdn.com/artworks-y7Tyi9W7mwWNHxMi-uU9FyA-t500x500.jpg", song_likes=[jason, roysa])

# https://appacademymusic.s3.us-west-2.amazonaws.com/You+Were+Right.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/wildfire.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/We+Stayed+Up+All+Night+(feat.+Ardyn).mp3

# https://appacademymusic.s3.us-west-2.amazonaws.com/TWO+LANES+-+Never+Enough+(Nils+Hoffmann+Remix).mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Time.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Tim+Linghaus+-+Travel+Sketches+(Lost+In+A+Bus+And+Architecture).mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Through+Different+Eyes.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Stolen+Dance+-+Milky+Chance.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Stir+Fry.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Silver+Lining.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/orbit.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/No+Place.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Miracle+(with+Ellie+Goulding).mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Maybe+I+Was.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Massane+-+Craving+feat.+Benjamin+Roustaing.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Line+Of+Sight+(feat.+WYNNE+%26+Mansionair).mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Lil+Uzi+Vert+-+Just+Wanna+Rock.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Light+That+Shines+Through.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Kasbo+-+Found+You+(Feat.+Chelsea+Cutler).mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/John+Summit+Hayla+-+Where+You+Are.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Its+Strange+(Ft.+K.Flay).mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Goldmund+-+Sometimes.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Forgive+Me+(feat.+Izzy+Bizu).mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Feel+Your+Weight+(Angara+Remix).mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Everybody+Else.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Ends+of+the+Earth.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Daylight.mp3
# https://appacademymusic.s3.us-west-2.amazonaws.com/Cinnamon.mp3

# https://appacademypictures.s3.us-west-2.amazonaws.com/all-your-days.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/carry-you.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/cinnamon-jome.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/you-were-right.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/wildfire.jpg
# https://appacademypictures.s3.us-west-2.amazonaws.com/where-you-are.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/we-stayed-up-all-night.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/user5prof.jpg
# https://appacademypictures.s3.us-west-2.amazonaws.com/user4prof.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/user4head.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/user3prof.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/user3head.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/user2prof.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/user2head.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/user1prof.png
# https://appacademypictures.s3.us-west-2.amazonaws.com/user1head.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/profilepic3.png
# https://appacademypictures.s3.us-west-2.amazonaws.com/travel-sketches.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/time.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/through-dif-eyes.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/stolen-dance.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/stir-fry.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/sometimes.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/silver-lining.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/perhaps.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/orbit.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/No_Place_by_Rufus_Du_Sol.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/never-enough.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/miracle.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/maybe-i-was.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/line-of-sight.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/light-that-shines.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/just-wanna.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/its-strange.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/go-nowhere.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/marea-weve-lost-dancing.png
# https://appacademypictures.s3.us-west-2.amazonaws.com/found-you.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/forgive-me.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/feel-your-weight.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/ends-of-the-earth.jpg
# https://appacademypictures.s3.us-west-2.amazonaws.com/daylight.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/craving.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/cinnamon-jome.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/carry-you.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/artworks-000237202870-g8u96m-t500x500.jpeg
# https://appacademypictures.s3.us-west-2.amazonaws.com/all-your-days.jpeg

    song1 = Song(user_id=4, title="Line Of Sight (feat. WYNNE & Mansionair)", artist="ODESZA", genre="Electronic", description="The new album 'A Moment Apart out now", length=3.57, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Line+Of+Sight+(feat.+WYNNE+%26+Mansionair).mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/line-of-sight.jpeg", song_likes=[demo, jason, lillyann])
    song2 = Song(user_id=5, title="Cinnamon", artist="JOME", genre="Indie", description="Cinnamon is a calming alternative indie song", length=3.24, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Cinnamon.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/cinnamon-jome.jpeg", song_likes=[ryan, jason])
    song3 = Song(user_id=4, title="Marea (we've lost dancing)", artist="Fred again..", genre="Electronic", description="released by Fred Again..", length=4.45, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Marea+(weve+lost+dancing).mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/marea-weve-lost-dancing.png", song_likes=[roysa, jason, demo])
    song4 = Song(user_id=5, title="Carry You", artist="Novo Amor", genre="Indie", description="Lifted from the 'Bathing Beach' EP out now via AllPoints", length=4.33, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Carry+You.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/carry-you.jpeg", song_likes=[ryan, roysa, jason])
    song5 = Song(user_id=1, title="No Place", artist="RÜFÜS DU SOL", genre="Electronic", description="Relased by RÜFÜS DU SOL", length=3.58, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/No+Place.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/No_Place_by_Rufus_Du_Sol.jpeg", song_likes=[jason, roysa])
    song6 = Song(user_id=2, title="Wildfire", artist="Jeremy Zucker", genre="Indie", description="Released by Jeremy Zucker", length=2.43, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/wildfire.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/wildfire.jpg", song_likes=[demo, jason])
    song7 = Song(user_id=3, title="Everybody Else", artist="Emmit Fenn", genre="Electronic", description="Maybe it's you, Maybe it's me", length=3.54, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Everybody+Else.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/artworks-000237202870-g8u96m-t500x500.jpeg", song_likes=[ryan, demo, lillyann])
    song8 = Song(user_id=4, title="Sometimes", artist="Keith Kenniff", genre="Piano", description="Title track from my new Goldmund album, 'Sometimes', out November 14th on Western Vinyl.", length=2.49, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Goldmund+-+Sometimes.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/sometimes.jpeg", song_likes=[demo, roysa, jason, lillyann])
    song9 = Song(user_id=5, title="Just Wanna Rock", artist="Lil Uzi Vert", genre="Hip-hop & Rap", description="Just wanna rock released by Generation Now/Atlantic", length=2.03, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Lil+Uzi+Vert+-+Just+Wanna+Rock.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/just-wanna.jpeg", song_likes=[roysa, jason])
    song10 = Song(user_id=1, title="Travel Sketches", artist="Moderna Records", genre="Classical", description="Artist : Tim Linghaus, Track : Travel Sketches (Lost In A Bus And Architecture), Album : Vhoir", length=5.19, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Tim+Linghaus+-+Travel+Sketches+(Lost+In+A+Bus+And+Architecture).mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/travel-sketches.jpeg", song_likes=[jason, roysa, lillyann])
    song11 = Song(user_id=2, title="Maybe I Was", artist="Sultan + Shepard", genre="Electronic", description="Off the new album 'Forever, Now'", length=4.27, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Maybe+I+Was.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/maybe-i-was.jpeg", song_likes=[ryan, demo])
    song12 = Song(user_id=3, title="Miracle (with Ellie Goulding)", artist="Calvin Harris", genre="Dance & EDM", description="Hope you enjoy this new one with Ellie", length=3.06, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Miracle+(with+Ellie+Goulding).mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/miracle.jpeg", song_likes=[ryan, lillyann, roysa])
    song13 = Song(user_id=4, title="You Were Right", artist="RÜFÜS DU SOL", genre="Electronic", description="'You Were Right' is the first single taken from the sophomore album from RÜFÜS", length=3.58, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/You+Were+Right.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/you-were-right.jpeg", song_likes=[jason, demo])
    song14 = Song(user_id=5, title="Stir Fry", artist="Migos", genre="Hip-hop & Rap", description="Stir Fry released by Quality Control Music, LLC", length=3.10, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Stir+Fry.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/stir-fry.jpeg", song_likes=[demo, roysa, jason])
    song15 = Song(user_id=1, title="John Summit, Hayla - Where You Are", artist="John Summit", genre="Dance & EDM", description="Released by: Off The Grid/Darkroom Records", length=3.56, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/John+Summit+Hayla+-+Where+You+Are.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/where-you-are.jpeg", song_likes=[jason, lillyann])
    song16 = Song(user_id=2, title="Perhaps things had finally begun to move", artist="A Cerulean State", genre="Ambient", description="Hope you enjoy! :)", length=4.13, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/A+Cerulean+State+-+Perhaps+things+had+finally+begun+to+move.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/perhaps.jpeg", song_likes=[ryan, demo, jason])
    song17 = Song(user_id=3, title="All Your Days (with Emmit Fenn)", artist="Shallou", genre="Indie", description="A collaboration with Emmit Fenn. Produced by shallou and vocals by Emmit Fenn.", length=4.35, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/All+Your+Days+(with+Emmit+Fenn).mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/all-your-days.jpeg", song_likes=[roysa, ryan, lillyann])
    song18 = Song(user_id=4, title="Silver Lining", artist="Mt. Joy", genre="Alternative Rock", description="Prod. by Jon Gilbert", length=3.19, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Silver+Lining.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/silver-lining.jpeg", song_likes=[roysa, jason])
    song19 = Song(user_id=5, title="It's Strange (Ft. K.Flay)", artist="Louis The Child", genre="Electronic", description="As seen on HYPEM", length=4.05, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Its+Strange+(Ft.+K.Flay).mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/its-strange.jpeg", song_likes=[ryan, jason])
    song20 = Song(user_id=1, title="Ends Of The Earth", artist="Lord Huron", genre="Soundtrack", description="Ends Of The Earth by Lord Huron", length=4.44, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Ends+of+the+Earth.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/ends-of-the-earth.jpg", song_likes=[ryan, roysa, jason, lillyann])
    song21 = Song(user_id=2, title="Daylight", artist="Beauvois", genre="Ambient", description="My album 'Marks' is now available everywhere!", length=4.04, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Daylight.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/daylight.jpeg", song_likes=[ryan, jason])
    song22 = Song(user_id=3, title="Go Nowhere feat. Annastacia Boudwin", artist="Archaellum", genre="Dance & EDM", description="Discover the latest releases from Archaellum", length=5.18, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Archaellum+-+Go+Nowhere+feat.+Annastacia+Boudwin+%5BExtended+Mix%5D.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/go-nowhere.jpeg", song_likes=[demo, lillyann])
    song23 = Song(user_id=4, title="We Stayed Up All Night (feat. Ardyn)", artist="Tourist", genre="Electronic", description="We Stayed Up All Night - Available Everywhere", length=4.25, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/We+Stayed+Up+All+Night+(feat.+Ardyn).mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/we-stayed-up-all-night.jpeg", song_likes=[roysa, lillyann])
    song24 = Song(user_id=5, title="Found You (Feat. Chelsea Cutler)", artist="Kasbo", genre="Electronic", description="Hope you like it. Xo - Kasbo", length=3.16, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Kasbo+-+Found+You+(Feat.+Chelsea+Cutler).mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/found-you.jpeg", song_likes=[ryan, roysa, jason, demo])
    song25 = Song(user_id=1, title="Craving feat. Benjamin Roustaing", artist="Massane", genre="Electronic", description="Massane's incredible new single featuring Benjamin Roustaing.", length=3.43, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Massane+-+Craving+feat.+Benjamin+Roustaing.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/craving.jpeg", song_likes=[ryan, roysa])
    song26 = Song(user_id=2, title="orbit", artist="silvershore", genre="Electronic", description="Released by Enhanced Chill", length=3.28, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/orbit.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/orbit.jpeg", song_likes=[ryan, demo, lillyann])
    song27 = Song(user_id=3, title="Forgive Me (feat. Izzy Bizu)", artist="ODESZA", genre="Electronic", description="Listen and save the new album 'The Last Goodbye'", length=3.28, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Forgive+Me+(feat.+Izzy+Bizu).mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/forgive-me.jpeg", song_likes=[roysa, lillyann])
    song28 = Song(user_id=4, title="Time", artist="Hans Zimmer", genre="Soundtrack", description="WaterTower Music", length=4.35, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Time.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/time.jpeg", song_likes=[demo, jason])
    song29 = Song(user_id=5, title="Feel Your Weight (Angara Remix)", artist="ARKANGEL", genre="Dance & EDM", description="Released by Enhanced Chill", length=4.31, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Feel+Your+Weight+(Angara+Remix).mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/feel-your-weight.jpeg", song_likes=[ryan, demo, roysa])
    song30 = Song(user_id=1, title="Never Enough (Nils Hoffmann Remix)", artist="TWO LANES", genre="Electronic", description="Released by bitbird", length=3.43, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/TWO+LANES+-+Never+Enough+(Nils+Hoffmann+Remix).mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/never-enough.jpeg", song_likes=[ryan, jason, lillyann])
    song31 = Song(user_id=2, title="Stolen Dance", artist="Milky Chance", genre="Indie", description="Stolen Dance by Milky Chance", length=4.44, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Stolen+Dance+-+Milky+Chance.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/stolen-dance.jpeg", song_likes=[ryan, jason, demo, lillyann])
    song32 = Song(user_id=3, title="Through Different Eyes", artist="WEARECHPTRS", genre="Folk & Singer-Songwriter", description="Through Different Eyes by CHPTRS.", length=5.57, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Through+Different+Eyes.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/through-dif-eyes.jpeg", song_likes=[ryan, demo, roysa, lillyann])
    song33 = Song(user_id=4, title="Light That Shines Through", artist="Emmit Fenn", genre="Indie", description="Pre save my debut album out next month", length=3.40, song_url="https://appacademymusic.s3.us-west-2.amazonaws.com/Light+That+Shines+Through.mp3", song_image_url="https://appacademypictures.s3.us-west-2.amazonaws.com/light-that-shines.jpeg", song_likes=[roysa, lillyann])

    # db.session.add(demo_song)
    # db.session.add(roysas_song)
    # db.session.add(jasons_song)
    # db.session.add(ryans_song)
    # db.session.add(lillyanns_song)
    db.session.add_all([song1, song2, song3, song4, song5, song6, song7, song8, song9, song10, song11, song12, song13, song14, song15, song16, song17, song18, song19, song20, song21, song22, song23, song24, song25, song26, song27, song28, song29, song30, song31, song32, song33,])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM songs")

    db.session.commit()
