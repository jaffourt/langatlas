import React, { Component } from "react";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {Sphere} from "three";

interface Props {
    parentID: string;
}

// TODO:
// update figure width/height with event listener -- done
// wait until parent node mounts, then render brain onto parent

class Brain3D_obj extends Component<Props> {

    node: any
    canvas: any

    componentDidMount() {

        const oldLogFunction = console.warn;
        console.warn = function(){};
        this.node = document.getElementById(this.props.parentID);

        const THREE = require('three');
        const OrbitControls = require('three-orbit-controls')(THREE);
        const scene = new THREE.Scene();

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        // renderer.setPixelRatio( this.node.devicePixelRatio );

        this.canvas=renderer.domElement;
        renderer.setClearColor( 0x000000, 0 ); // the default
        // renderer.setSize( window.innerWidth, window.innerHeight );

        renderer.setSize( this.node.offsetWidth, 300 );

        const camera = new THREE.PerspectiveCamera( 60, 2, 50, 1000 );
        // camera.position.set(2, 0, 5)
        // camera.position.set(1, -1, 190)
        // camera.position.set(0,0,0)
        camera.lookAt(new THREE.Vector3())

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.rotateSpeed = 0.05;
        controls.dampingFactor = 0.15;
        controls.enableZoom = true;
        controls.zoomSpeed = 0.25;
        controls.autoRotate = true;
        controls.autoRotateSpeed = .5;
        controls.maxDistance = 220;
        controls.minDistance = 140;

        const ambientLight = new THREE.AmbientLight( 0xcccccc, 1.5 );
        scene.add( ambientLight );

        // const pointLight = new THREE.PointLight( 0xffffff, 0.05 );
        // camera.add( pointLight );
        // scene.add( camera );

        // append the renderer to the node
        this.node?.appendChild(renderer.domElement)

        const loader = new OBJLoader()
        loader.load(process.env.PUBLIC_URL + '/SPM_cortex_20484_atlas.obj', function (object) {
            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    // @ts-ignore
                    (child.geometry.computeBoundingBox())
                    const middle = new THREE.Vector3();
                    // @ts-ignore
                    child.geometry.boundingBox.getCenter(middle);
                    object.applyMatrix4(new THREE.Matrix4().makeTranslation(
                        -middle.x, -middle.y, -middle.z ) );

                }
            } );
            object.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2))
            object.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI/2 + Math.PI/15))
            // object.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI/2))
            // object.applyMatrix4(new THREE.Matrix4().makeTranslation(-10,0,0))
            scene.add(object)
            renderer.render(scene, camera)
        })

        function render() {
            renderRequested = false;
            controls.update();
            renderer.render(scene, camera);

        }

        function requestRenderIfNotRequested() {
            if (!renderRequested) {
                renderRequested = true;
                requestAnimationFrame(render);
            }
        }

        let renderRequested = false;
        controls.addEventListener( 'change', requestRenderIfNotRequested );
        requestRenderIfNotRequested();

        function stopRotating()
        {
            controls.autoRotate = false;
            controls.update()
        }
        this.node.addEventListener( 'mousedown', stopRotating);

        function onWindowResize(node: any) {
            camera.aspect = node.offsetWidth / 300;
            camera.updateProjectionMatrix();
            renderer.setSize(node.offsetWidth, 300);
            renderer.render(scene, camera)
        }

        const node = this.node;
        window.addEventListener( 'resize', function(){onWindowResize(node)}, false );

        function onMouseMove( event: any, node: any ) {
            // calculate mouse position in normalized device coordinates
            // (-1 to +1) for both components
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            // mouse.x = ( event.clientX / node.offsetWidth ) * 2 - 1;
            // mouse.y = - ( event.clientY / node.offsetHeight ) * 2 + 1;

            // calculate objects intersecting the picking ray
            raycaster.setFromCamera( mouse, camera );

            // scene.children[1].children[0].updateMatrixWorld();

            // const intersects = raycaster.intersectObject( scene.children[1].children[0] );
            const intersects = raycaster.intersectObjects( scene.children, true );

            // intersects is probably an array, or all the faces intersecting the ray

            if (intersects.length > 0)
            {
                // the first object intersected
                // console.log(intersects[0].point)
                renderer.render(scene, camera)
                // intersects[0].face.color.setRGB( Math.random(), Math.random(), Math.random())
                // intersects[0].object.material.color.set( 0xFFFF00 );
                console.log(intersects[0])

                intersects[0].object.geometry.attributes.color.needsUpdate = true;

            }
        }

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        this.node.addEventListener( 'click', function(e:any){onMouseMove(e,node)}, false );

        console.warn = oldLogFunction; // reset console.warn
    }

    componentWillUnmount() {
        this.node?.removeChild(this.canvas)
    }

    render() {
        // return (<div ref={ref => (this.mount = ref)} />)
        return (<div id={this.props.parentID}/>)
    }
}
export default Brain3D_obj;