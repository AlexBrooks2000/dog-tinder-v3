# dog-tinder-v3
## Launch application
Once cloned, the application should run with the command
```sh
npm start
```
if not, then you may need to install the packagaesexpress, uuid-random and sqlite using these commands:
```sh
npm i express
npm i sqlite
npm i uuid-random
```

## Features
### Search for dogs
The application allows you to search dogs by their sex. To do this, go to the "search dogs" page, select the sex you wanna find and press filter.
This will bring up all the dogs under that sex including dogs that belong to you.

### Viewing a dog's profile
To view a profile, go to "search dogs" and follow the instruction for search for dogs to list dogs. On each card there is a button that says 'profile',
click the button to go to the profile. Alternativly, if you go to 'my dogs' it will list all dogs that beling to you, and pressing 'profile' will
also take you to the dogs profile page.

### Add a dog
To add a dog, go to the 'my dogs' page. At the top of the page will be a button that says 'add dog', this will take you to a form to fill out.
Once the form is filled out, press 'add dog'.


### Edit a dog
To edit an existing dog, go to 'my dogs'. next to each dog is a link that says 'edit profile'. Once clicked you will be taken to a page similar to the
add dog page. Here you can change any values of the dog. Once done press 'update'.

### messaging
To message, first search for a dog, next to each profile is a message button, once pressed will send you to a page where you can message the owner.

## Design
I have chosen to have a simple design where navigation is on the left, the main view is on the right and a simple header at the top displaying the
name and logo of the application. When the screen is made smaller, the navigation is moved from the left and is placed on top of the main view. This is
done so that the application is more useable when the screen is made smaller and more specifically more usable on mobile devices.
At the top right on the screen, there is a message saying 'welcome joe blogs' and a button with 'log out. At the moment it isn't usable but at a later date will allow
the user to log in and out of an account.

## Unfinished and future work

* Improvements in design. Make each element more clear and usable and making sure nothing is coming out of any cards or elements and overlapping.
* add more filters when searching for a dog, such as name breed and the ability to choose wether to include dogs owned by the user in the search
* To imporve messaging. At the moment messaging only works through saving essages in an array serverside, and client side
and the fetch function for the messages being called on a loop.
* The ability to log in and out of the application and for users to be able to create their own profiles.
