<a name="readme-top"></a>
<h1 align="center" style="display: block; font-size: 2.5em; font-weight: bold; margin-block-start: 1em; margin-block-end: 1em;">

<a name="logo" href="placeholder"><img align="center" src="https://github.com/oslabs-beta/metronome/assets/88234607/101a5734-211d-42e3-9123-e63623f46ed3" alt="Metronome Logo (Home)" style="width:25%;height:25%"/></a>
  <br /><br /><strong>[Metronome](#metronome)</strong>
  
</h1>
<div align="center"> 

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
[![ApexCharts](https://img.shields.io/badge/ApexCharts-5A2A7E?style=for-the-badge&logo=apexcharts&logoColor=white)](https://apexcharts.com/)

<br /><br />

---

<p align="center" style="display: block; font-size: 1.5em; font-weight: bold; margin-block-start: 1em">
Quick Links
  <br /><br />
</p>
<p align="center" style="font-size: 1em">
<a name="website" href="https://metronome-mauve.vercel.app/">Website</a>
<a name="medium" href="https://medium.com/@vickyliu_66425/metronome-a-react-based-dev-tool-with-powerful-metrics-892307e401b3">Medium</a>
</p>
<br /><br />

</div>

---


  <!-- TABLE OF CONTENTS -->
  
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
     <a href="#what-is-metronome">What is Metronome?</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#how-to-add-metronome-as-a-chrome-extention">How to Add Metronome as a Chrome Extention</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a>
      <ul>
        <li><a href="#data-parsing">Data Parsing</a></li>
        <li><a href="#component-tree">Component Tree</a></li>
        <li><a href="#react-metrics">React Metrics</a></li>
        <li><a href="#component-render-durations">Component Render Durations</a></li>
        <li><a href="#component-render-frequencies">Component Render Frequencies</a></li>
      </ul>
      </li>
    <li><a href="#how-does-it-work">How Does it Work</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## What is Metronome?

Metronome is a tool used to better improve render times of components. Have you ever had an issue with pin pointing why a component hasn't rendered efficiently in a application? Metronome will help with honing in on what causes slow render times and go indepth on where to update the code.

Here's why:
* Certain components may re-render inefficently due to a multitude of factor; with Metronome, components can be identified and be refactored for better render times
* With the graphs provided by Metronome, developers can better see which components is taking the longest to render
* The component tree and the record feature will aid developers in visualizing each individual component when tracking down the cause of slow render times in their application

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

In order for Metronome to function, you will need to intsall the latest chrome extension of React Developer Tools. This only works for functional components and not class components.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/oslabs-beta/metronome.git
   ```
2. Install NPM packages
   ```sh
   cd metronome
   npm install
   cd chrome-extension
   npm install
   ```
3. Build DIST folder

   ```sh
   npm start
   ```


### How to Add Metronome as a Chrome Extention

4. Go to chrome://extensions/
5. Click on Load unpacked
6. Locate the file in the filpath (metronome/chrome-extension/dist) and select
7. Once the extension is loaded, go to detail section and turn on "Allow access to file URLs"
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES -->
## Features

### Data Parsing
Before we show the visualizations and charts powered by Metronome, let’s first go through the data parsing. Metronome parses through the React fiber tree for each recorded action that was profiled by the user, and filters out non-functional components(which are not part of the virtual DOM) in the object.

In addition to this, Metronome determines whether a component has rendered with logic that compares the render data between the node and its children, and establishes the relationship between the current node and the overall fiber tree. It then pulls the actual duration and self based duration of each rendered component and tracks the number of times a component renders during the recorded action.


<p align="center">
  <img src="https://github.com/oslabs-beta/metronome/assets/88234607/ba5e15d3-b017-4e24-8b91-fff711f68f28"  alt="Data Parsing">
</p>


### Component Tree
Metronome presents a real-time visualization of the component tree by parsing through the React Fiber Tree and presenting functional components as state and props change over time. This allows users to easily see the relationship between the components.


<p align="center">
  <img src="https://github.com/oslabs-beta/metronome/assets/88234607/0c40f5ef-a4a4-406b-a652-bb5265b26035"  alt="Component Tree">
</p>


<p align="center"><i><sub style="font-size: 11px; color: gray;">Example of a component tree rendered by Metronome</sub></i></p>

Users can see the tree update in real time as components are updated in the application.


<p align="center">
  <img src="https://github.com/oslabs-beta/metronome/assets/88234607/a2f698b5-fddd-4678-919c-1730df22d034"  alt="Component Tree">
</p>

### React Metrics
Have you ever wondered which part of your React application is taking the longest to render? Or wondered how many times a component re-renders when you click refresh? Metronome aims to help developers analyze and troubleshoot their React applications by providing visualizations of these metrics.

<p align="center">
  <img src="https://github.com/oslabs-beta/metronome/assets/88234607/8d6e4a7d-4b11-4b2d-99ad-5cc793daafba"  alt="React Metrics">
</p>

### Component Render Durations
With the parsed data, Metronome compiles and displays the sum of all self-based durations for all instances that a specific component renders during a recorded action that was profiled by the user.


<p align="center">
  <img src="https://github.com/oslabs-beta/metronome/assets/88234607/36543aa5-f24d-451f-a367-781e024bc74b"  alt="Component Render Durations">
</p>

<p align="center"><i><sub style="font-size: 11px; color: gray;">Example of a component tree rendered by Metronome</sub></i></p>

The component render durations is a pie chart that shows the breakdown of all components that have actively rendered during the profiled event, and as shown in the screenshot below, a user can get a breakdown of which components rendered for the longest duration (measured in ms). This informs the user of what is taking up the most render time when they perform specific actions in their React application.

### Component Render Frequencies

Metronome lends insight for users to track how many times a component has rendered when a specific action in the React application is profiled by the user. For example, When you click refresh, how many times does your Navbar render? This could be helpful for users to optimize their React applications and pinpoint inefficiencies in their app.

In the bar chart, Metronome ranks and displays the number of times a component has rendered during the profiled event. This is updated each time a user is done profiling a new action on their React Application.

<p align="center">
  <img src="https://github.com/oslabs-beta/metronome/assets/88234607/f460a286-d4cc-4e8c-9185-aa4b6f8951e8"  alt="Bar Chart in Metronome for a Sample React Application">
</p>
<p align="center"><i><sub style="font-size: 11px; color: gray;">Bar Chart in Metronome for a Sample React Application</sub></i></p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- How Does It Work -->

## How Does It Work

We use a React Dev Tool object called ‘__REACT_DEVTOOLS_GLOBAL_HOOK__’ which allows us to access the react fiber for each event snapshot when render events occur. This object contains component information and the pre-formatted component tree that we then parse through to create the visualization that you see in Metronome.
We dived deep into the object to understand how the React Dev Tool parses through the data to determine which components have rendered and which have not, Note: AD stands for Actual Duration, which, similar to self-based duration, is a property for each component in the React fiber.
Actual Duration is found to be the total duration for a component to render in React, including the time it took for all of its child components to render.
Self-based Duration is found to be the duration for a component to render in React, excluding its children’s render times.
But it does not stop there, we have found that additional logic and parsing is required to accurately reflect whether a component has rendered or not.
For each node, after we’ve filtered out all of the Non-functional components and have established parent-children relationships by parsing through the tree, here’s the logic we use to parse through the object:

<p align="center">
  <img src="https://github.com/oslabs-beta/metronome/assets/88234607/dbe4837c-dcb4-45a8-a080-3f84b7f0f3ab"  alt="How Does It Work">
</p>


Disclaimer on the tool: we have found that in rare occurrences, when a component’s actual duration is equal to the sum of its immediate child component(s) actual durations, most of the time this means that the component did not render, with the exception that sometimes the parent will have rendered for <0.1ms (a negligible amount), this is not clearly explained in React Dev Tools but the occurrence is rare and there’s some inner logic in the React Dev Tool beyond the object that we that we are not able to access.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTORS -->
## Contributors

[<img src="https://github.com/oslabs-beta/metronome/assets/88234607/fd5a0911-4348-4144-bcaf-07daf66add9b" width="100px;" alt=""/>](https://github.com/VLPUBI)
[Vicky Liu](https://github.com/VLPUBI)

[<img src="https://github.com/oslabs-beta/metronome/assets/88234607/021d002c-41ed-475d-a128-ee8f25657a42" width="100px;" alt=""/>](https://github.com/j9peters)
[Jeanine Peters](https://github.com/j9peters)

[<img src="https://github.com/oslabs-beta/metronome/assets/88234607/b8fe83b8-7d09-4d2a-a94d-b524358fc265" width="100px;" alt=""/>](https://github.com/mxlisandro)
[Lisandro Olivares](https://github.com/mxlisandro)

[<img src="https://github.com/oslabs-beta/metronome/assets/88234607/866a7a77-ae11-45db-a72b-e614b86b371d" width="100px;" alt=""/>](https://github.com/zsugino)
[Zai Sugino](https://github.com/zsugino)

[<img src="https://github.com/oslabs-beta/metronome/assets/88234607/cd4b2b88-91b1-4c04-a064-4e8803138efb" width="100px;" alt=""/>](https://github.com/beonuigbo)
[Bruce Onuigbo](https://github.com/beonuigbo)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
