# OCAD University Open WebXR Template for A-Frame
Updated 2022-02-25

OCAD University Open WebXR is a free and open-source project template for staging and showcasing digital work in an Extended Reality (XR) space. The WebXR platform uses [A-Frame](https://aframe.io), an open-source library for implementing 3D and VR content in the browser with [HTML](https://html.com/). It is built on [ThreeJS](https://threejs.org), a JavaScript library for rendering 3D models on the web. Our Open WebXR Gallery template is officially hosted [on Glitch.com](https://glitch.com/~ocadu-open-webxr), with stable versions mirrored to [GitHub](https://github.com/ocadwebxr/ocadu-open-webxr). You may be interested in visiting [our student gallery](https://glitch.com/~ocadu-web-xr).

This project was made possible with funding by the Government of Ontario and through eCampusOntario’s support of the Virtual Learning Strategy. To learn more about the Virtual Learning Strategy visit  [https://vls.ecampusontario.ca](https://vls.ecampusontario.ca). 

This software is provided without warranty or liability. Licensing information is available at the end of this README.

### Sister Projects

This is one of three projects developed in parallel by OCAD University and York University researchers with the goal of providing students of varying educational backgrounds and skillsets with the necessary toolkits to quickly produce WebXR envrironments for their creative media projects:

* [WebXR Template for P5.js](https://github.com/worldmaking/WebXR_P5js_eCampus21)
* [WebXR Template for Three.js and Node.js](https://github.com/worldmaking/WebXRNodeLab_eCampus21) 

---------

## Table of contents
(Use Ctrl+F / ⌘F to navigate the manual quickly)

<b>User Manual</b>
1. Getting Started
2. Navigating Your New Project Remix
4. Initializing a Gallery
5. Staging Assets
    * The A-Frame Inspector
6. Incorporating Non-Primitive Assets
    * Media Preparation
    * Uploading Your Work
    * Preloading Assets
7. Overlay Content and the Gallery Hub Network
8. A Note About Debugging

<b>A-Frame Entity Tag Guide</b>
1. Introduction
    * Staging Models
    * Staging Point Clouds
    * Staging Video
    * Staging Sound
    * Staging Other Content
2. Modifying the Gallery Environment 
    * Lights
    * The Skybox
    * The Ground
    * Avatars
3. Custom A-Frame Components

<b>Asset Acknowledgements & Licensing</b>

---------

# User Manual

This guide is a detailed guide on how to prepare a Open WebXR Gallery.

You do not need to have any prior knowledge of code to use the WebXR platform, however if you are new to HTML we recommend giving this [brief tutorial by Mozilla](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics) a quick read to familiarize yourself with HyperText Markup Language.

A video tutorial is available for viewing on [Knowmia](https://ocadu.techsmithrelay.com/Rz60).

---------

## Creating a New Open WebXR Project

Open WebXR is hosted on [Glitch](https://glitch.com/~ocadu-open-webxr) and [GitHub](https://github.com/ocadwebxr/ocadu-open-webxr). We recommend that users new to programming use Glitch, a free web and app hosting and code 'remixing' service, where users with registered Glitch accounts can adopt copies of other users projectsm edit them as they like, and collaborate live with other Glitch users. Our README is focused towards introducing users to the Glitch workflow, but more advanced users may prefer to fork or clone the repository directly from GitHub and host and edit the project using their preferred set of software tools.

Getting started with Open WebXR is as easy as [setting up a Glitch account](https://glitch.com/signup), navigating to our [Open WebXR Project page on Glitch](https://glitch.com/~ocadu-open-webxr) and clicking 'Remix This' add an editable copy of the template project to your new account. Glitch will randomly generate a whimsical name for your project (in the upper left of the project editor), but you can rename it to something else by clicking 'Edit details' on your new project page (https://glitch.com/~your-new-project). If you want to access your project later, click your account icon in the top right of Glitch.com, then click 'Your Projects'; all of your project should be listed there. Alternatively, go to "https://glitch.com/@X", replacing 'X' with your Glitch username, and scroll to the bottom to see your recent projects.

Glitch features a live code editing environment (IDE) hosted in the browser; you do not need to have any other software installed. You can learn more about Glitch at the [Glitch Help Center](https://help.glitch.com/home/).

To <b>collaborate</b> on your project with others, click the 'Share' button in the top left of the project editor and under "Invite project members", search for your collaborator's Glitch username, and click 'Send Invite'. Projects you are invited to will appear in the 'Your Projects' page under the 'member of' filter.

---------

## Navigating Your New Project Remix

You can access your project's code editor by clicking 'Edit Project' from your project page. The center of the code editor is the text editor window, while the lefthand panel is the project heirarchy, which contains all the files in the project. You can access your project's home page directly from "http://your-project-name.glitch.me", or click 'Preview' at the bottom of the code editor screen to open up a new browser tab or preview pane on the righthand side of the code editor. 

All galleries in your project are accessible from the project home page, 'index.html', found under the '/public' folder dropdown in the project hierarchy. The default 'index.html' homepage acts as a gallery hub for navigating between galleries. Clicking 'index.html' in the project hierarchy displays the HTML code for the home page, which features a simple set of button tags with URLs and text fields that can be modified to link to any galleries in your project domain. Later in this guide we will demonstrate how to create the actual WebXR environments to showcase our projects, but it's good to be roughly familiar with this page when we later wish to navigate to our media. 

If you want to create a new gallery link button, you can copy and paste an existing gallery button and modify it as you'd like:
```
<button class="button" onclick="window.location.href='YOURURL';"> <!-- Replace YOURURL with the link you want to navigate to -->
  <h3>Room Zero</h3>    
  <h2>Author</h2>
  <span><i>short title</i></span>
</button>
```

To open the template gallery, open the project homepage and click the 'Template Room' button. 

Each WebXR gallery space supports several means of navigation:
- Use the arrow keys and WASD to move. 
- Click and drag the mouse to look around.
- On a smartphone, turn the phone to look around. Tap and hold to move forward.
- If you have a compatible VR headset, you can view your work in VR by clicking the VR icon.

Descriptions of the controls are also available by clicking the gamepad icon; you can modify this description by modifying the file 'public/controls.html' in the code editor's folder hierarchy.

We will cover how to edit the appearance of the Gallery Hub as well as more advanced page navigation features in a later section of the README.

---------

## Initializing a Gallery

Galleries in Open WebXR are built on A-Frame, a JavaScript framework for AR/VR experiences on the web.

Open WebXR galleries are best created from copies of the 'public/gallery_template.html' page in our folder hierarchy. We can create a copy of this page by hovering our mouse over and clicking the triple dot icon, then clicking 'duplicate'. Give the duplicate page a unique name starting with 'public/' and ending with '.html' such as "public/GALLERYNAME.html". This will be your gallery page. You can access your new copy of the template at "http://your-project-name.glitch.me/GALLERYNAME.html". 

With your new gallery created, there are a few important changes you must make to the file. We highly recommend using Glitch's search feature to navigate the code browser and find sections fast (click anywhere in the code and press Ctrl+F / ⌘F) as you don't need to know the details of the HTML document just yet; after clicking anywhere in the text window and pressing the command, a search bar will appear in the top right. 

1. Open your new 'public/GALLERYNAME.html' file by clicking it in the folder hierarchy.
2. In the 'Header Metadata Section' of your new file (Ctrl+F / ⌘F), look for the 'title' tag and replace it with a title of your choosing; this is your browser tab title. After this, change the 'myPageID' value to any random five characters or numbers, e.g. "BIRD5".
3. Go to the 'Scene Loading' section (Ctrl+F / ⌘F) and replace the phrase 'network-room-name' with any unique phrase of your choosing (no spaces). 
4. Update the 'public/index.html' page with a new button for your project as described in "Accessing Your Project", replacing 'YOURURL' with '/GALLERYNAME.html'

---------

## Staging Assets

Open WebXR is built with A-Frame. We will cover the basics of A-Frame that you need to know to get started. For complete documentation on A-Frame, click [here](https://aframe.io/docs/1.2.0/introduction/).

Everything in an A-Frame gallery is part of a 'scene'; all assets loaded into a scene must be enclosed within the 'a-scene' tag. You can find this in the gallery code base 'SCENE CONTENT SECTION' (Ctrl+F / ⌘F). For example, our sample gallery comes with a 'plinth' cylinder primitive in this section to demonstrate basic 3D objects.

Asset objects have tags that indicate that a preloaded asset must be placed in a particular position in the scene world. Below are some examples of simple primitives that you can add to your scene:
```
<a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
<a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
<a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
<a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
```
As shown above, each tag pair has attributes such as position, rotation and color that define its physical or behavior properties. If you want to transform the position, scale or rotation of an object relative to another object's position, you can place the object's tag inside of the other as follows:
```
<a-box position="-1 0 -3" rotation="0 45 0" color="#4CC3D9">
  <a-sphere position="0 0 5" radius="1.25" color="#EF2D5E"></a-sphere>
</a-box>
```
In the example above, our box is located at (-1, 0, -3) while our sphere is located at (0, 0, 5) relative to the box, or (-1, 0, 2) in the world space. 

After inserting these tags, the objects will appear in the scene. Previewing your changes is as easy as opening the Glitch preview panel and navigating to your gallery page from the home page button you created in "Initializing a Gallery". If you would like to add more complicated objects to your scene, you will find more information on staging models, point clouds and videos later in this readme as well as the [A-Frame Documentation](https://aframe.io/docs/1.2.0/introduction/).

If you ever need to undo changes you've made, in addition to Ctrl+Z (the Undo function) you can click Tools->Rewind from the bottom of the code editor and roll back to previous file states as shown in the interactive timeline.

#### The A-Frame Visual Inspector

If you would like to view and modify the properties of these shapes and other objects, you can open up A-Frame's Visual Inspector by pressing 'Ctrl + Alt + I' in your WebXR gallery.
Once the inspector has loaded, you can select any asset objects in your scene in the left-side panel and modify their properties on the right side panel or by moving them in the debug viewer in the centre of the screen.

IMPORTANT! These changes are not permanent; be sure to copy any numeric values you change into the object tags of your HTML document to save changes. 

Learn more about A-Frame's Visual Inspector by clicking [here](https://aframe.io/docs/1.2.0/introduction/visual-inspector-and-dev-tools.html).

---------

## Incorporating Non-Primitive Assets

In place of primitives, there are a variety of other media assets available that you can insert into your scene such as point clouds, images, models, sound and/or video. You can view a shortlist of available A-Frame entity tags in the <b>A-Frame Entity Tag Guide</b> section of this readme or view the full list of Tags in vanilla A-Frame in the [A-Frame Documentation](https://aframe.io/docs/1.2.0/introduction/), but first you will need to upload your assets to your Glitch Project. The following subsections cover how to prepare and upload your assets for the web gallery.


### Media Preparation

When you have media ready to upload, it is critical to optimize your work ahead of uploading it to ensure galleries run smoothly across various devices. In some cases, an asset too large will simply not load and cause your gallery to freeze; try testing out different file sizes on different machines, though we recommend not using more than 30MB of asset data per gallery, ideally closer to 5-10MB.

There are many ways to optimize the file size of your work depending on the medium. Some good rules of thumb:

- Export at the smallest size and/or resolution that you can afford
- Export on lower quality settings
- Remove unnecessary or unseen geometry in point clouds or models

For point clouds or 3d models, make sure that the origin of your 3D object or point cloud is located at 0,0,0 ; this ensures that any transformations made to the object in the WebXR environment are relative to the center of the object.

For point clouds, we recommend you use [this tool](https://colab.research.google.com/drive/1VuLNoZE2TWsTAJbeVOQUaaqAX36Tqelt) to compress your work automatically. (Hosted on Google Colab by Nick Fox-Gieg) A tutorial video on how to use the tool is available [here](https://ocadu.techsmithrelay.com/u6wI).

For 3D models or point clouds, you can use [Draco](https://google.github.io/draco/) before submitting. Draco is an open-source library for compressing and decompressing 3D geometric meshes and point clouds. Learn more about Draco [here](https://google.github.io/draco/).

There are many video and audio conversion and compression tools available online such as [Format Factory](http://www.pcfreetime.com/formatfactory/index.php?language=en) (though if using Format Factory, be sure not to install any adware that comes with the installer by unchecking the option when prompted). In terms of video and audio formats we recommend MP4 and MP3, though A-Frame is compatible with multiple other offerings.

### Uploading Your Work

First, you will need to [upload your work as an Asset to Glitch](https://help.glitch.com/kb/article/43-how-do-i-add-assets-like-audio-images-or-videos-to-my-projects/).

1. Open the WebXR Platform code editor for your remixed project (see Getting Started)
2. In the folder hierarchy, click on 'Assets'
3. Drag and drop your work into the assets window or click the 'Upload an Asset' button and select your work from your computer.
4. After your work is finished uploading, you may now reference your asset throughout your project by clicking the asset's icon and copying the hyperlink provided. 

Please note that these asset links are intended to be referenced by files within your Glitch project and are not guaranteed to work outside of your project.

For more information on uploading assets, click [here](https://help.glitch.com/kb/article/43-how-do-i-add-assets-like-audio-images-or-videos-to-my-projects/).

### Preloading Assets

While optional, preloading assets ensures that your media is loaded before the user is permitted in the gallery. It also helps reduce redundant loading calls to the same resource, improving performance. At present, this feature is supported for all types of asset files EXCEPT point clouds. All preloading asset tags are placed in the 'Asset Loading Section' of the gallery template.

To prepare your media for preloading, use one of the following tags as appropriate for your media of choice. Replace 'ZZZZ' with the hyperlink you obtained from the 'Uploading Your Work' section. You can use any nickname in place of 'XXXX', the asset tag name; in your A-Frame Entity Tags (see the A-Frame Entity Tag Guide section), replace the src attribute value "#YYYY" with "#XXXX", where 'XXXX' is the asset tag name you invented. For example, if my tag name was 'catSound', then the 'src' attribute would look like `src="#catSound"`.

```
<!-- Preloading Tags
XXXX - an identifying nickname for the asset (no spaces)
Z - the hyperlink to the asset, from the Assets folder in your folder hierarchy

Unless the asset is video, audio, or image, use the a-asset-item tag.

If you want sound to play in your scene as background music instead of positional audio, add the following attributes:
autoplay - play the media automatically on startup
loop="true" - start the audio again when it finishes
-->

<video id="XXXX" src="ZZZZ" crossorigin="anonymous" ></video>             
<audio id="XXXX" src="ZZZZ" crossorigin="anonymous" ></audio>  
<img id="XXXX" src="ZZZZ" crossorigin="anonymous" ></img> 
<a-asset-item id="XXXX" src="ZZZZ" crossorigin="anonymous" ></a-asset-item>  
```

If your asset is particularly large, you may want to add the `preload="auto"` attribute to your asset item tag. This will force the asset to be loaded before the scene starts, ensuring that the asset reliably appears in the scene. Note that this is not be a substitute for Media Preparation; every time your site is opened, visitors will need to download all the content you have uploaded, so be sure to be careful about the size of your assets. You can also add the attribute 'timeout="10000"' to the `<scene>` tag to tell A-Frame to wait at least 10 seconds (10000 milliseconds) before giving up trying to load your assets, but we highly recommend reducing the size of your assets before resorting to increasing your visitor's loading times.

---------

## Overlay Content and the Gallery Hub Network

When visiting the template gallery, on the right-hand side you will find four 'overlay' buttons: Information, Controls, Sitemap, and Home. 
* The Information button opens a panel providing information on the artwork or gallery exhibit; we encourage you to fill out the 'Artwork Description Subsection' to describe yourself, your work and its context.
* The Controls button provides a description of the basic controls for navigating the A-Frame gallery space. This is automatically filled by the 'public/controls.html' file.
* The Sitemap button links to galleries listed in 'public/js/gallerymap.js' 
* Finally, the Home button opens the gallery hub index page. 

You can find all of the code for this content in the `Overlay Panels Section` of the template gallery HTML document. If you want to change the links and content for the Home and Sitemap buttons, you can modify 'public/js/gallerymap.js' in your local JS folder; instructions are provided in the file. Note that the alternative 'index_canvas.html' homepage uses these values to populate its gallery links automatically; you may prefer this option over the default homepage. 

You are welcome to remix the styling of this section as you like by modifying the `overlay_style.css` page and by adding additional buttons / panels based on our core feature examples.

If you want to adjust the style of the gallery hub you can open and modify the 'hub_style.css' file in the left-side file browser. Try making some simple adjustments to get familiar with the style sheet. For more information on modifying CSS files, check out [Mozilla's Basic CSS tutorial](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics).

---------

## A Note About Debugging

We've included this section for users unfamiliar with debugging code to help identify some common reasons why things might now work as expected. While learning to debug is outside of the scope of this README, this section briefly points out some common issues that occur in documents regardless of skill level.

Some common errors for all skill levels include ensuring that all HTML tags and quotation marks are closed, minor typographical errors (typos, capitalization), and missing or incorrect symbols (e.g. using '=' instead of ':'). Another good idea is to double check to make sure that your code matches the examples provided in this README or A-Frame's documentation on the relevant element. Glitch also sometimes notifies of errors with red circles, which you can hover over for more information.

It is useful to know that most web browsers have a code debugging inspector that can be opened by pressing 'Ctrl + Shift + I', which may be handy in the event that your gallery suddenly stops working and you cannot diagnose the issue yourself, or if there is a bug in our software outside of your control. Deciphering its interface may be challenging, so we advise to check first that your code does not fall under any of the previous pitfalls.

---------

# A-Frame Entity Tag Guide

The following subsections detail how to setup particular A-Frame entities with premade sample tags that you can copy into your gallery's 'SCENE CONTENT SECTION' (Ctrl + F).

For detailed information covering most of the content in this section, you can read the [A-Frame Documentation](https://aframe.io/docs/1.2.0/introduction/) on the respective material.

--------

### Staging Models

3D models should be in GLTF or OBJ format. GLTF is preferred as they can contain much more useful information about your models in a single file. The [Blender 3D modelling software](https://www.blender.org/) can import multiple formats including OBJ and FBX and export GLTF files in their place.


```
<!-- GLTF Model
src - Hyperlink or preloading tag to model asset 
scale - Scale of model (x,y,z)
position - Position of model from origin (x,y,z) 
rotation - Euler rotation of model (x,y,z)
-->
<a-gltf-model      
  src="#YYYY"         
  scale="1 1 1"      
  position="0 0 0"   
  rotation="0 0 0"
></a-gltf-model> 

<!-- OBJ Model
src - Hyperlink or preloading tag to model asset 
mtl - Hyperlink or preloading tag to material asset 
scale - Scale of model (x,y,z)
position - Position of model from origin (x,y,z) 
rotation - Euler rotation of model (x,y,z)
-->
<a-obj-model  
  src="#YYYY" 
  mtl="#ZZZZ" 
  scale="1 1 1"
  position="0 0 0" 
  rotation="0 0 0" 
></a-obj-model>
```

--------

### Staging Point Clouds

At this time, only point clouds in PLY format are supported. Preloading tags are not supported for point clouds. An example is provided in our Gallery Template.

```
<!-- Point cloud
src - Hyperlink to PLY asset 
scale - Scale of cloud (x,y,z)
position - Position of cloud from origin (x,y,z) 
rotation - Euler rotation of cloud (x,y,z)
size - Size of points in cloud
-->
<a-pointcloud 
        src="YYYY        
        scale="1 1 1"     
        position="0 0 0"  
        rotation="0 0 0"   
        size="0.001">    
 </a-pointcloud>
 ```
 
 --------

### Staging Video

Videos are rendered as double-sided panels with no thickness in A-Frame.

```
<!-- Video
src - Hyperlink or preloading tag to video asset 
position - Position of video from origin (x,y,z) 
rotation - Euler rotation of model (x,y,z)
width - Video proportional width
height - Video proportional height
autoplay - Start video automatically
loop="true" - loop video
-->
<a-video 
  src="#YYYY"        
  width="16"         
  height="9"         
  position="0 0 0"
  autoplay
>  
</a-video>
```

Note: We have implemented a click-to-play feature to the galleries to bypass autoplay policies in most web browsers. This ensures that any audio or video asset with autoplay will play after the user clicks the click-to-play overlay.

Click [here](https://aframe.io/docs/1.2.0/primitives/a-video.html) to learn more about video in A-Frame.

--------

### Staging Sound

Positional sounds can be attached to most A-Frame components as an attribute or implemented independently using the 'sound' tag. If you're looking for non-positional sound, see the 'Preloading Assets' section of this README.

```
<!-- Sound
src - Hyperlink or preloading tag to audio asset 
position - Position of audio from origin (x,y,z) 
autoplay - Start audio automatically
loop="true" - loop audio
rolloffFactor - rate in which audio volume decays as a visitor moves away from this object
-->

<!--OPTION 1-->
<a-sound src="#YYYY" autoplay="true" loop="true"></a-sound>

<!--OPTION 2-->
<a-entity 
  id="soundBubble"                           
  position="0 0 0"                 
  sound="src: #YYYY; autoplay: true; loop: true; rolloffFactor: 8;">  
</a-entity>
```

Note: We have implemented a click-to-play feature to the galleries to bypass autoplay policies in most web browsers. This ensures that any audio or video asset with autoplay will play after the user clicks the click-to-play overlay.

Click [here](https://aframe.io/docs/1.2.0/components/sound.html) to learn more about sound in A-Frame, including other basic attributes you can adjust.

---------

### Staging Other Content

A-Frame can support additional content types beyond the ones previously described. Check out [A-Frame's Full Documentation](https://aframe.io/docs/1.2.0/introduction/), particularly under the primitives section.

Beyond what A-Frame officially supports, you may be able to find additional libraries online that extend its capabilities. Some libraries such as volumetric video, are currently not supported by our version of A-Frame; among other reasons, updates to the THREE.js library have caused some A-Frame extensions that have not been updated in years to break. 


---------

## Modifying the Gallery Environment

This section briefly explains how you can make simple modifications to the gallery environment in case you want to change the look of the avatar, the environment of the gallery, the particles or lighting system
This section assumes familiarity with the previous sections of this user manual.

### Lights

Under the `<!--    Lights    -->` block you will find an entity tag block with the id 'whiteLight': this is the light that makes the scene visible. Consider adjusting this to a 'warmer' colour to apply a warm tone across the scene.
We have also commented out an example of a violet 'positional' light that you may wish to experiment with. The intensity attribute of the light determines how bright it appears in the gallery.

For more information on lights, check out [A-Frame's documentation on lights](https://aframe.io/docs/1.2.0/components/light.html).

### The Skybox

The gallery environment is encapsulated within a 'skybox' which by default appears plain black. 
You can modify the color of this skybox by navigating to the `<!--      Sky     -->` block and adjusting the color attribute in the 'a-sky' tag.
You can also apply an image to the skybox; we have already included an image tag in this section that you can uncomment to use; just replace the 'src' attribute value with an image URL.

### The Ground

If you would like to incorporate a pseudo-infinite ground plane, you can navigate to the `<!--     Ground      -->` section and uncomment the 'a-entity' tag block below it.
Just like with the skybox, you can also define an image to tile along the surface of the ground plane.

### Avatars

Modifying Avatars in the gallery is complicated by nature of our project's use of networked presence; to ensure that an avatar's properties are mirrored to other clients, it is necessary to modify three different sets of HTML tags in the gallery to make major changes to the avatar appearance: the Avatar model, the Player/User prototype, and the NAF field. Describing the workings of the networked presence component is outside the scope of this README, but you can read more about the component we use to accomplish this [here](https://www.npmjs.com/package/networked-aframe).

That being said, you should be able to experimentally make minor changes to the avatar-template's scale and shapes used provided that the tag structure remains the same. 

---------

## Custom A-Frame Components

Components can be added to all manners of A-Frame entities to extend their functionality. 
We can transform objects that we place in our scenes by changing their scale, rotation and position, but if we wanted to, say, have an object rotate over time or have an object scale to a particular size over time, we need to use our own components.

If we wanted to have a cube spin over time, we could use this code in our gallery:
```
<a-box 
  color="tomato" 
  position="3 2 3"
  depth="0.5" height="0.5" width="0.5"
  rotate-time="rotationSpeed: 0.01 -0.01 0.02"
  >
</a-box>
```
Notice the 'rotate-time' component? This is one of several basic components provided in our `basic_components.js` that can be added to your primitives, point-clouds, etc. without any major scripting work on your part. You can browse this JS document to find more components that have been prepared for WebXR, or experiment with the component examples we have prepared in the gallery template.
You may also be interested in the components provided by [aframe-randomizer-components](https://www.npmjs.com/package/aframe-randomizer-components); we included this in the template to provide random colours to the avatars, but you might find some of its properties to be useful for your own projects.

You can add as many compatible components to your objects as you'd like, but if you want to implement more complicated behaviours, you may want to give the [A-Frame component documentation](https://aframe.io/docs/1.2.0/core/component.html) a review and be prepared to work with a little bit of JavaScript.

You can also check out [NPM's listing of A-Frame components](https://www.npmjs.com/search?q=aframe-component&page=0&perPage=20), including [a component for creating portals](https://www.npmjs.com/package/aframe-portals)! Follow the instructions with each component to install and use them with your project.

---------
                                              
## Asset Acknowledgements
                                              
The gallery template features a point cloud artwork created and provided courtesy of Pau Aviles, licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
           
The cartoon used in the gallery template is [Felix: Doubles for Darwin](https://archive.org/details/Felix_DoublesforDarwin_NoAudio), produced in 1924 by Margaret J. Winkler and Patrick Sullivan and presently under public domain.
                                              
The audio featured in the gallery template is [Blue Grass Blues as performed by the Chicago Blues Dance Orchestra](https://archive.org/details/78_blue-grass-blues_chicago-blues-dance-orchestra_gbia0278941a/BLUE+GRASS+BLUES+-+CHICAGO+BLUES+DANCE+ORCHESTRA.flac), published in 1923 and presently under public domain.
                                              
### Javascript Dependencies
                                              
This project incorporates the following JavaScript libraries:
  
- [A-Frame](https://aframe.io)
- [A-Frame Extras](https://github.com/n5ro/aframe-extras)
- [A-Frame Mobile Controls: Twoway Motion](https://github.com/Ctrl-Alt-Zen/aframe-mobile-controls/tree/master/components/twoway-motion)
- [A-Frame Point Cloud Component](https://github.com/daavoo/aframe-pointcloud-component)
- [A-Frame Randomizer Components](https://www.npmjs.com/package/aframe-randomizer-components)
- [Networked A-Frame](https://www.npmjs.com/package/networked-aframe)
- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [jQuery](https://jquery.com/)
- [Socket.io](https://socket.io/)
- [ThreeJS](https://threejs.org)
                       
---------

## Software Licensing Notice

    OCAD University Open WebXR Template for A-Frame
    Copyright (C) 2022  Tyson Moll, Elizabeth Lopez, Judith Doyle, and Nick Alexander

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
                       