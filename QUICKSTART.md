# Quick Start Guide

Last updated 2022-02-07

Having trouble? 

Contact [ocadwebxr@gmail.com](mailto:ocadwebxr@gmail.com) with a description and/or screenshots of the trouble you are encountering or post in your OCAD U Canvas Class Discussion board (if applicable).

## Introduction

Ready to get started with OCAD U's WebXR Environment?
With this quick start guide, we'll show you everything you need to get any supported asset up and running in your own WebXR project, whether it be a 3D model, a point cloud or a video. Our goal with this guide is to keep the amount of editing required to a minimum so that you can get yourself up and running and become familiar with the site layout.

We'll lead you through the following steps: making your own project, uploading your assets (artworks), making your own gallery (or galleries), inserting your assets into galleries, and final touches. 

This guide skips over several interesting and helpful details, so if you're looking for a more thorough manual or more documentation on how to get something particular set up, be sure to check out the README file!

What You'll Need:
- [A Glitch.com account](https://glitch.com/signin)
- The asset file(s) (supported formats include .ply, .fbx, .glsl, .obj, and most common image, video, and audio formats)
- About 20 minutes

This guide assumes a Windows, Mac, or Linux environment. We recommend keeping this guide open in a separate window so that you can flip back to it easily as you work through the guide.

WARNING: Any code on glitch.com will be publicly accessible. Be careful not to share any sensitive information.

## Creating Your Project

If you haven't already, register and sign in to your Glitch.com account.

Now let's navigate to the [OCAD U WebXR project page](https://glitch.com/~ocadu-web-xr).

Keep an eye out for a 'Remix This!' button, located underneath the website preview. Click it!
![Remix This! Glitch Icon](https://i.imgur.com/lE9Kdxo.png)

This will take you to a new code editor window that is an exact copy of the OCAD U WebXR Template. This is yours to edit as you like! If you ever need to navigate back here, you can click your avatar icon twice in the top right of any Glitch.com page and find it listed at the bottom of your profile.

Congrats! You now have your own WebXR project!
 
To wrap things up, we can give it a name by clicking temporary project title in the top left of the code editor window, then typing whatever we like for the site's title and description. The site title will also define the URL of site on Glitch.com, so choose wisely!

![Changing a Project Name](https://imgur.com/ZCq1YjD.gif)

## Glitch Project Orientation

![Code Editor Page](https://imgur.com/rvX25ZF.png)

Welcome to the code editor for your project! This is where we will be uploading content to the web and setting up our gallery for viewing. 

The panel on the left is the project file browser, which lists all the files that make up your project, including copies of this Quickstart Guide and the Readme. The project also features folders; try clicking 'public/' to show or hide all the webpages that make up your site. 

Clicking on any of the files in the project file browser will show its content in the central content pane; this is generally where you will be editing the code of the site. 

Finally, the right panel is the site preview panel, which automatically updates whenever the site is modified. The page displayed is the homepage, 'public/index.html'. You can hide this panel by clicking the 'x' in the top right or arrow in the top left; if you ever want to bring it back, click the 'Show' dropdown in the top-left. This dropdown also allows you to open your site in a new window.

You can also invite your buddies to collaborate on your project by clicking the 'Share' button and searching for their Glitch username.

## Uploading an Asset

![File Browser](https://imgur.com/jTPW4tY.png)

At the top of this file browser is the assets folder. Click it to open up the project assets. This folder contains all the media that make up the content of your site, like images, pointclouds and models.

![Asset Manager](https://imgur.com/ktgQc4l.png)

To upload your asset file(s), just drag and drop your asset from your file browser to the middle of the page, or click 'Upload Asset' and navigate to the file on your computer.

If you click an asset, you'll be given the option to either delete an asset or copy a link. We'll need to copy this link later.

## Make a Gallery

Let's create a gallery for our new asset!

In the file browser, open the 'public/' dropdown and hover over 'gallery_template.html'. Click the 3-dots that appear on the right side of the file and select 'Duplicate'. A pop-up should appear over your browser; change the name to something like 'public/cereal-is-a-soup.html' and hit 'OK'.

![Duplicate a Page](https://imgur.com/8X1xmIA.png)

These Glitch projects are coded in HTML, which are essentially just text instructions, following a structured format.  The template is set up so you just need to replace and/or delete text. 

Within your own copy, with some basic text editing, you can swap your work in for the examples, and modify how they look and behave to your own purpose. 

To make sure we can navigate to this page later, we also need to make a quick edit to the 'index.html' page, the homepage of our site. 

![Index Page](https://imgur.com/pi69IAC.png)

You should see a 'button' tag that looks roughly like this:
```
<button class="button" onclick="window.location.href='/gallery1.html';">
  <h3>Room One</h3>    
  <h2>PAU AVILES</h2>
  <span><i>Alebrije</i></span>
</button>
```
Replace '/gallery1.html' with the name of your new gallery, the contents of the 'h2' tag with your name, and replace 'Alebrije' with a title for your site. When you're done, you should see a new button in the right panel that you can click to navigate to your new gallery!

Now that we have a gallery, we can get started on editing it by clicking the gallery name in the file browser, which will open up the code editor in the center screen. Almost there! 

## Inserting your Asset into the Gallery

Especially if you are new to HTML, opening up your gallery for the first time is going to look a little daunting! Luckily, we don't have to fiddle around with most of this content. Click inside the code editor panel and press Ctrl+F / ⌘F to search the document. A text field will show up in the top right. Type 'SCENE CONTENT SECTION', click the 'v' arrow, then scroll down until you see the word 'PLINTH'.

![Search Code](https://imgur.com/KD7mjbd.gif)

Let's look at the code snippet here for a moment:
```
<a-cylinder
  color="grey"
  height="0.05"
  radius="4"
  position="0 1 0"
></a-cylinder>
```
The chevron tags around the word 'a-cylinder' define that this object is a cylinder. Each object begins and ends with a set of tags like this. Inside the tags are attributes. Here, we define that the color of the cylinder is grey, its height is 0.05 units, the cylinder's radius is 4 units, and the cylinder is located at position x=0, y=1, z=0. We could also add attributes for 'rotation' and 'scale' if we wanted to.

If you continue scrolling, you'll see tags for a pointcloud, a video, and other shapes. 

Notice the 'src' attribute? (That's the source!) This is where we put the link from the assets section! Try copying/pasting a set of asset tags that match the asset you uploaded and replacing their src value with the URL you found for your object in the Assets section. If the asset you're trying to add isn't listed, check the README guide under 'Staging Assets' for more information. (you can use Ctrl+F / ⌘F to search this document, too!)

Once you have swapped out the template assets for your own, you should delete the lines of coding associated to whatever you aren't using in this gallery. 

NOTE:  WHAT HAPPENS IF I MESS UP? If it’s too hard to just correct what you just did, Glitch allows you to “Rewind” (look for it under tools) and take the project back to a previous time.

## Final Touches

At this stage, you should be able to view your asset in your gallery by clicking the menu button we created on the home page in our site preview.

To wrap things up, let's just make a few changes to our project to really make it our own.

First up, navigate back to 'index.html' in the code editor. You can remove any buttons that you no longer want to use and change any text describing OCAD University's WebXR content to something befitting your project. If you want to change the look of the home page, you can modify the contents of 'hub_style.css'; this is a CSS document that describes how to decorate the attributes of the home page. Explaining CSS is outside the scope of this guide, but you can get [a quick introduction from this Mozilla guide](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS) and look up any attributes that you are considering modifying to get an idea of what they do.

Now let's head back to our gallery in the code editor. At the top of our webpage, we have the title of the gallery and its meta description. Let's change it to something better fitting the content of our new gallery.

![Gallery Header](https://imgur.com/W2dCRJE.png)

Using the search function, type 'Overlay Panels'. This section contains the code for the pop-up overlay containing information about the artwork in your gallery. You can replace the descriptive text here as you'd like. The overlay panels also have their own CSS sheet called 'overlay_style.css' in case you want to modify the look or color scheme.

![Overlay Panels](https://imgur.com/lbOX2bn.png)

The last step is to update the networking settings. Scroll down until you reach the following section:

![Loading and Networking](https://imgur.com/N3IszyH.png)

The important thing here is to change 'network-room-name' to another word without spaces. It can be anything unique. This defines what 'room' visitors will enter when accessing your gallery; if all the galleries on your site had the same name, they would all appear to have the same guests regardless of which gallery they were actually looking at.

And with that, you have finished setting up your new WebXR Gallery Site! Congrats!
For more detailed instructions, check out the general README.md file.

If you have any feedback you would like to share with us about this guide, please send us an email at [ocadwebxr@gmail.com](mailto:ocadwebxr@gmail.com); we would love to hear from you!