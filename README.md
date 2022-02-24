# OCAD University Open WebXR Template for A-Frame

OCAD University Open WebXR is an open-source A-Frame project template for building AR/VR gallery spaces for a variety of digital media. This is one of three project templates developed in parallel by OCAD University and York University with the goal of providing students of varying educational background and skillsets with the necessary tools to quickly produce WebXR environments for their creative media projects.

This project was made possible with funding by the Government of Ontario and through eCampusOntario’s support of the Virtual Learning Strategy. To learn more about the Virtual Learning Strategy visit  [https://vls.ecampusontario.ca](https://vls.ecampusontario.ca). 

## Sister Projects
(TBA)

---------

# User Manual
#### Getting Started with the WebXR Platform
Updated 2022-02-07

Having trouble? 

Contact [ocadwebxr@gmail.com](mailto:ocadwebxr@gmail.com) with a description and/or screenshots of any issues you may be encountering and we will do our best to assist you.

---------

## Table of contents
(Use Ctrl+F / ⌘F to navigate the manual quickly)

1. Getting Started
2. The Gallery Hub
3. Viewing the Galleries
4. Media Preparation
5. Uploading Your Work
6. Staging Your Work
    * Initializing a Gallery
    * Preloading Assets
    * Staging Assets (Models, Point Clouds, Sound, Video)
7. Modifying the Gallery Environment 
    * Lights, Sky, Ground, Particles, Avatar
8. Staging Other Content
9. Modifying Overlay Content
10. A-Frame Components
11. Troubleshooting Notes
12. Asset Acknowledgements

---------

## Getting Started ##

The OCAD U Open WebXR platform is a free and open resource for staging and showcasing digital work in an Extended Reality (XR) space. Our demonstration gallery is hosted at [https://ocadu-web-xr.glitch.me/](https://ocadu-web-xr.glitch.me/). 

The source code for our WebXR platform is hosted on the [OCAD U Open WebXR project page at Glitch.com](https://glitch.com/~ocadu-web-xr). Glitch is a free web and app hosting and code 'remixing' service, where users with registered Glitch accounts can adopt copies of other users projects and edit them as they like. [Click here](https://glitch.com/signup) to create a Glitch account. 

As a Glitch user, clicking the 'Remix This' button on the project page will save a copy of the project to your Glitch account; this will create a copy of the platform that you can freely edit yourself or alongside collaborators. Glitch will randomly generate a whimsical name for your project (upper left), but you can rename it to something else if you'd like. Alternatively, you can review the source code directly from the project page or access our mirror on Github.

If you want to access your project later, click your account icon in the top right of Glitch.com twice to go to your profile page; your project should be listed there.

Glitch features a live code editing environment (IDE) hosted in the browser. You do not need to have any other software installed. Learn more about Glitch at the [Glitch Help Center](https://help.glitch.com/home/).

If you want to <b>collaborate</b> on your project with others, click the 'Share' button in the top left of the project editor, search for your collaborator's username, and click 'Send Invite'.

---------

## The Gallery Hub

All galleries in your project are accessible from the project home page. By default, this is the first page that appears in the right side panel.
Click 'Change URL' to find your root URL. If you copy this url into your browser URL bar, you can access your home page directly. You can later use this field to modify the page that appears every time your code is modified (e.g. try typing 'gallery_template.html' here).

If we want to modify this page, we can open the 'public/' dropdown and click 'index.html'.

Here, you can modify the text that is displayed on the gallery hub as you see fit. If you want to create a new gallery link button, you can copy and paste the existing gallery buttons which look roughly like this:
```
<button class="button" onclick="window.location.href='YOURURL';"> <!-- Replace YOURURL with the link you want to navigate to -->
  <h3>Room Zero</h3>    
  <h2>Author</h2>
  <span><i>short title</i></span>
</button>
```

If you want to adjust the style of the gallery hub you can open and modify the 'hub_style.css' file in the left-side file browser. Try making some simple adjustments to get familiar with the style sheet. For more information on modifying CSS files, check out [Mozilla's Basic CSS tutorial](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics).

---------

## Viewing the Galleries

The default index.html homepage acts as a gallery hub for navigating between galleries. The HTML code features a simple set of button tags with URLs that can be modified to link to any galleries in your project domain.

Each WebXR gallery space supports several means of navigation:
- Use the arrow keys and WASD to move. 
- Click and drag the mouse to look around.
- On a smartphone, turn the phone to look around. Tap and hold to move forward.
- If you have a VR headset plugged in, you can view your work in VR by clicking the VR icon.

Note that the space is not constrained by physics; there is no gravity by default.

---------

## Media Preparation

When you have pointclouds, images, models and/or video ready to upload, it is critical to optimize your work ahead of uploading it to ensure galleries run smoothly across various devices. 

In your pointcloud or 3d modelling software, make sure that the origin of your 3D object or point cloud is located at 0,0,0 ; this ensures that any transformations made to the object in the WebXR environment are relative to the center of the object.

There are many ways to optimize the file size of your work depending on the medium. Some good rules of thumb:

- Export at the smallest size and/or resolution that you can afford
- Export on lower quality settings
- On models or point clouds, remove unnecessary or unseen geometry
- Remove any metadata

For point clouds, we recommend you use [this tool](https://colab.research.google.com/drive/1VuLNoZE2TWsTAJbeVOQUaaqAX36Tqelt) to compress your work automatically. (Hosted on Google Colab by Nick Fox-Gieg)

For 3D models or pointclouds, you can use [Draco](https://google.github.io/draco/) before submitting. Draco is an open-source library for compressing and decompressing 3D geometric meshes and point clouds. Learn more about Draco [here](https://google.github.io/draco/).

---------

## Uploading Your Work

[![Uploading your work tutorial video](https://img.youtube.com/vi/VyrIb0-ihUo/0.jpg)](https://www.youtube.com/watch?v=VyrIb0-ihUo)

First, you will need to [upload your work as an Asset to Glitch](https://help.glitch.com/kb/article/43-how-do-i-add-assets-like-audio-images-or-videos-to-my-projects/).

1. Open the WebXR Platform code editor for your remixed project (see Getting Started)
2. In the menu in the left panel, look for the 'assets' folder directly below the 'New File' dropdown; open the folder.
3. Drag and drop your work into the assets window or click the 'Upload an Asset' button and select your work from your computer.
4. After your work is finished uploading, you may now reference your asset throughout your project by clicking the asset's icon and copying the link provided. 

Please note that these asset links can only be referenced by files within your Glitch project; referencing them outside of your project or within 

For more information on uploading assets, click [here](https://help.glitch.com/kb/article/43-how-do-i-add-assets-like-audio-images-or-videos-to-my-projects/).

---------

## Staging Your Work

The WebXR platform uses [A-Frame](https://aframe.io), an open-source library for implementing 3D and VR content in the browser. It is built on [ThreeJS](https://threejs.org). A-Frame, and the WebXR platform, are accessed using a [HTML](https://html.com/)-based code language. 
You do not need to have any prior knowledge of code to use the WebXR platform, however if you are new to HTML we recommend giving this [brief tutorial by Mozilla](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics) a quick read to familiarize yourself with HyperText Markup Language.

For the complete documentation on A-Frame, click [here](https://aframe.io/docs/1.2.0/introduction/).

### Initializing a Gallery

1. Open your 'Remixed' copy of the WebXR platform in code editor mode (from your project page, click 'Edit Project'). If you haven't Remixed the original WebXR platform, refer to the 'Getting Started' section of this user manual.
2. Update the name of your project by clicking on the dropdown in the top-left corner of the code editor and modifying the project name text field. This will be your project domain's name.
3. Open the 'public' dropdown and hover over 'gallery_template.html'. Click the three-dot menu beside this file and select 'Duplicate'.
4. Give the duplicate page a unique name starting with 'public/' and ending with '.html' such as "public/GALLERYNAME.html". This will be your gallery page. You can access it at (your project domain name).glitch.me/GALLERYNAME.html. 

With your new gallery created, there are a few important changes you must make to the file.

1. In the 'Header Metadata Section' at the beginning of the new GALLERYNAME.html file's code, look for the 'title' tag and replace it with a title of your choosing. This is the text that will appear in your browser tab when visiting the gallery. After this, change the 'myPageID' value to any random five characters or numbers, e.g. "BIRD5"; this code can be optionally used for gallery mapping.
2. Go to the 'Scene Loading' section and replace the phrase 'network-room-name' with any unique phrase of your choosing. This ensures that your gallery visitors are unique from any other gallery; otherwise, visitors to the template gallery will also appear to be in your new gallery.
3. Open the 'index.html' page and create a new button (see The Gallery Hub section of this user manual). Use the URL '/GALLERYNAME.html'; the slash indicates that your browser should open up the file 'GALLERYNAME.html' in the same folder as your 'index.html' page.

We highly recommend using Glitch's search feature to navigate the code browser and find sections faster (click anywhere in the code and press Ctrl+F / ⌘F). 

### Preloading Assets

Preloading assets ensures that your media is loaded before the user is permitted in the gallery. It also helps reduce redundant loading calls to the same resource, improving performance. At present, this feature is supported for all types of asset files EXCEPT pointclouds.

To prepare your media for preloading, do the following:

[![Linking your work tutorial video](https://img.youtube.com/vi/S1ySPLaN6W4/0.jpg)](https://www.youtube.com/watch?v=S1ySPLaN6W4)

1. Scroll to the 'ASSET LOADING SECTION' in the gallery code base (use Ctrl+F / ⌘F); this is the Assets Loading section, where you will tell the code to label and load any assets you have added.
2. Paste the following code: `<a-asset-item id="XXXX" src="#YYYY"></a-asset-item>` Replace XXXX with a brief one-word label for the work; you will use this term to reference the asset when staging it later. If the asset is an audio, video, or image asset, replace 'a-asset-item' with 'audio', 'video', or 'img' respectively.
3. After uploading your work to the [assets folder](https://help.glitch.com/kb/article/43-how-do-i-add-assets-like-audio-images-or-videos-to-my-projects/), select the asset and click Copy Link. Replace YYYY in step 2 with the link you copied. 

If your asset is particularly large, you may want to add the `preload="auto"` attribute to your asset item tag. This will force the asset to be loaded before the scene starts, ensuring that the asset reliably appears in the scene. Note that this is not be a substitute for Media Preparation; every time your site is opened, visitors will need to download all the content you have uploaded, so be sure to be careful about the size of your assets. You can also add the attribute 'timeout="10000"' to the `<scene>` tag to tell A-Frame to wait at least 10 seconds (10000 milliseconds) before giving up trying to load your assets, but we highly recommend reducing the size of your assets before resorting to increasing your visitor's loading times.

### Staging Assets

Everything in an A-Frame gallery is part of a 'scene'; all assets loaded into a scene must be enclosed within the 'a-scene' tag. You can find this in the gallery code base by scrolling to the 'SCENE CONTENT SECTION' (use Ctrl+F / ⌘F). Our sample gallery comes with a 'plinth' cylinder primitive to demonstrate.

Asset objects have tags that indicate that a preloaded asset must be placed in a particular position in the scene world. Below are some examples of simple primitives that you can add to your scene:
```
<a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
<a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
<a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
<a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
```
After inserting these tags, the objects will appear in the scene with the attribues specified (radius, rotation, position, etc.). If you would like to add more complicated objects to your scene, you will find more information on staging models, point clouds and videos in the following subsections.

Note that if you ever need to undo changes you've made, in addition to Ctrl+Z (the Undo function) you can click Tools->Rewind from the bottom of the file browser and roll back to previous file states.

#### The A-Frame Visual Inspector

If you would like to view and modify the properties of these shapes and other objects, you can open up A-Frame's Visual Inspector by pressing 'Ctrl + Alt + I' in your WebXR gallery.
Once the inspector has loaded, you can select any asset objects in your scene in the left-side panel and modify their properties on the right side panel or by moving them in the debug viewer in the centre of the screen.

IMPORTANT! These changes are not permanent; be sure to copy any values you change back into your object tags to save changes. In older versions of A-Frame, it was possible to copy the new HTML tag representing a modified object by clicking the page icon in the top right corner of the inspector window, but this feature seems to have been removed.

Learn more about A-Frame's Visual Inspector by clicking [here](https://aframe.io/docs/1.2.0/introduction/visual-inspector-and-dev-tools.html).

#### Staging Models

3D models should be in GLTF or OBJ format. GLTF is preferred as they can contain much more useful information about your models in a single file.

[![Staging your work tutorial video](https://img.youtube.com/vi/9DXnENCyHB0/0.jpg)](https://www.youtube.com/watch?v=9DXnENCyHB0)


```
<a-gltf-model      
  src="#YYYY"          <!-- Hyperlink to model asset -->
  scale="1 1 1"      <!-- Scale of model (x,y,z) -->
  position="0 0 0"   <!-- Position of model from world origin (x,y,z) -->
  rotation="0 0 0">   <!-- Euler rotation of model (x,y,z) -->
</a-gltf-model> 
```

NOTE: OBJs work a little differently, and require a little more file management. If you must work in OBJ format, click [here](https://aframe.io/docs/1.2.0/primitives/a-obj-model.html) for information on how to use them with A-Frame. You can also load OBJ files into Blender and export them as GLTF files to skip this process.

If you are looking to incorporate FBX models in your project, you may be interested in the JS library available [here](https://github.com/n5ro/aframe-extras/tree/master/src/loaders).
This library also includes a file supporting GLTF animations.

#### Staging Point Clouds

At this time, only pointclouds in PLY format are supported.

1. Scroll to the 'SCENE CONTENT SECTION' in the gallery code base (use Ctrl+F / ⌘F); this is the Scene Content section, where you will tell the code to place any assets you have loaded.
2. Type the following code. Replace YYYY with the link to an asset (as described in the Staging Your Work section of this user manual). Note that preloading is currently not supported for PLY files. An example pointcloud is provided in the gallery_template.html file.

```
<a-pointcloud 
        src="#YYYY        <!-- Hyperlink to PLY asset -->
        scale="1 1 1"      <!-- Scale of cloud (x,y,z) -->
        position="0 0 0"   <!-- Position of cloud from world origin (x,y,z) -->
        rotation="0 0 0">   <!-- Euler rotation of cloud (x,y,z) -->
        size="0.001">    <!-- Point scale -->
 </a-pointcloud>
 ```

#### Staging Video

1. Scroll to the 'SCENE CONTENT SECTION' in the gallery code base (use Ctrl+F / ⌘F); this is the Scene Content section, where you will tell the code to place any assets you have loaded.
2. Type the following code. Replace YYYY with the link to an asset (as described in the Staging Your Work section of this user manual).
```
<a-video 
  src="#YYYY"        <!-- Hyperlink to video asset -->
  width="16"         <!-- Video proportional width -->
  height="9"         <!-- Video proportional height -->
  position="0 0 0">  <!-- Video position -->
</a-video>
```

Note: We have implemented a click-to-play feature to the galleries to bypass autoplay policies in most web browsers. This ensures that any audio or video asset with autoplay will play after the user clicks the click-to-play overlay.

Click [here](https://aframe.io/docs/1.2.0/primitives/a-video.html) to learn more about video in A-Frame.

#### Staging Sound

Sounds can be attached to most A-Frame components as an attribute or implemented independently using the 'sound' tag.
.

1. Scroll to the 'SCENE CONTENT SECTION' in the gallery code base (use Ctrl+F / ⌘F); this is the Scene Content section, where you will tell the code to place any assets you have loaded.
2. Type the following code. Replace YYYY with the link to an asset (as described in the Staging Your Work section of this user manual).

`<a-sound src="#YYYY" autoplay="true" loop="true"></a-sound>`
OR
```
<a-entity 
  id="soundBubble"                           <!-- A descriptive name for this sound-holding entity -->
  position="0 0 0"                           <!-- Position of this component from world origin (x,y,z) -->
  sound="src: #YYYY; autoplay: true; loop = true;">        <!-- A link to the sound source, whether to start playing the audio immediately, and whether to loop the audio -->
</a-entity>
```

Note the autoplay and loop attributes of the sound component; you can switch these between true or false depending on if you want the audio to start immediately / want it to loop. You may also want to add 'rolloffFactor', the amount sound reduces in volume as you move closer or further from the sound component. By default, its value is set to 1; adjusting it to a number between 0 and 1 will cause the sound to decay slower whereas making it a number greater than 1 will make the sound decay faster.

Note: We have implemented a click-to-play feature to the galleries to bypass autoplay policies in most web browsers. This ensures that any audio or video asset with autoplay will play after the user clicks the click-to-play overlay.

Click [here](https://aframe.io/docs/1.2.0/components/sound.html) to learn more about sound in A-Frame, including other basic attributes you can adjust.

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

## Staging Other Content

A-Frame can support additional content types beyond the ones previously described. Check out [A-Frame's Full Documentation](https://aframe.io/docs/1.2.0/introduction/), particularly under the primitives section.

Beyond what A-Frame officially supports, you may be able to find additional libraries online that extend its capabilities. Some libraries, such as particle effects and volumetric video, are currently not supported by our version of A-Frame; among other reasons, updates to the THREE.js library have caused some A-Frame extensions that have not been updated in years to break. Enabling these extensions to be supported the current A-Frame build is among our development goals.

---------

## Modifying Overlay Content

On the right-hand side of the Template Gallery are three 'overlay' buttons: Information, Controls, Sitemap, and Home. 
* The Information button opens a panel providing information on the artwork or gallery exhibit; we encourage you to fill out this section to describe yourself, your work and its context.
* The Controls button provides a description of the basic controls for navigating the A-Frame gallery space. This is automatically filled by the 'controls.html' file in your project's local public folder.
* The Sitemap button links to some A-Frame galleries created by students by default. 
* Finally, the Home button opens the gallery hub index page. 

You can find all of the code for this content in the `Overlay Panels Section` of the template gallery HTML document. If you want to change the links and content for the Home and Sitemap buttons, you can modify 'public/js/gallerymap.js' in your local JS folder; instructions are provided in the file. Note that the alternative 'index_canvas.html' uses these values to populate its gallery links automatically. 

You are welcome to remix this section as you like by modifying the `overlay_style.css` page and by adding additional buttons / panels based on our core feature examples.

---------

## A-Frame Components

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
                                              
The gallery template features a pointcloud artwork created and provided courtesy of Pau Aviles.
           
The cartoon used in the gallery template is [Felix: Doubles for Darwin](https://archive.org/details/Felix_DoublesforDarwin_NoAudio), produced in 1924 by Margaret J. Winkler and Patrick Sullivan and presently under public domain.
                                              
The audio featured in the gallery template is [Blue Grass Blues as performed by the Chicago Blues Dance Orchestra](https://archive.org/details/78_blue-grass-blues_chicago-blues-dance-orchestra_gbia0278941a/BLUE+GRASS+BLUES+-+CHICAGO+BLUES+DANCE+ORCHESTRA.flac), published in 1923 and presently under public domain.
                                              
### Javascript Dependencies
                                              
This project incorporates the following JavaScript libraries:
  
- [A-Frame](https://aframe.io)
- [A-Frame Extras](https://github.com/n5ro/aframe-extras)
- [A-Frame Mobile Controls: Twoway Motion](https://github.com/Ctrl-Alt-Zen/aframe-mobile-controls/tree/master/components/twoway-motion)
- [A-Frame Pointcloud Component](https://github.com/daavoo/aframe-pointcloud-component)
- [A-Frame Randomizer Components](https://www.npmjs.com/package/aframe-randomizer-components)
- [Networked A-Frame](https://www.npmjs.com/package/networked-aframe)
- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [jQuery](https://jquery.com/)
- [Socket.io](https://socket.io/)
- [ThreeJS](https://threejs.org)
                       