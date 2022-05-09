<h1 align="center"> Sing-in-Sync (WIP)</h1>

#### Work In Progress

Web app similar to houseparty, where a user can create a room or join an existing room, which is controlled by the host.

This app is built using 
- Frontend : React Js
- Backend : Django
- Database : SQLite

## About

- A host can create a room and play songs of his choice from the Spotify API integrated in this app.
- The song is played synchronized over all the guests' devices that are joined to that particular room.
- Guest can skip a song by voting, the minimum votes required to skip is set by the host.
- The host can also give permission to guests to play/pause a song.


## Requirements

1. __Python 3__
  - After installing Python, further requirements are mentioned in [`requirements.txt`](https://github.com/YASHBRO/Sing-in-Sync/blob/master/requirements.txt).
  - To install, simply run :

        pip install -r requirements.txt 
  
    (`pip3` in Linux) in the root folder.
2. __Node__
  - after installing node to your system, the further requirements are already mentioned in [`package.json`](https://github.com/YASHBRO/Sing-in-Sync/blob/master/frontend/package.json) in the [`frontend`](https://github.com/YASHBRO/Sing-in-Sync/tree/master/frontend) folder
  - To install, first run 
  
        cd frontend
  
    or manually move frontend folder,
    
    then run
   
        npm install

    ### How to run :
    After installing the mentioned dependencies, open your terminal in the root directory and then run the following commands :

        python manage.py runserver
        cd frontend
        npm rnu dev

    These commands might vary a little bit depending upon your operating system, etc. For eg, `python` changes to `python3` in Linux


## Developer:

#### _Yash Joglekar_

My GitHub - [YASHBRO](https://github.com/YASHBRO/ "Contact me here") 


_For suggestions or bug/error report:_
- Raise an issue, I'll surely look into it as soon as possible
- Or mail me @ :- [yashjoglekar2012@gmail.com](https://mail.google.com/mail/u/0/?fs=1&to=yashjoglekar1220@gmail.com&su=Issue+with+MAD+repository&body=Write+your+issues+here:%0A "Click to send an email")

