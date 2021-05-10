import React, { Component } from "react";

interface Props {
    parentID: string;
}

// TODO:
// update figure width/height with event listener -- done
// wait until parent node mounts, then render brain onto parent

class Brain3D extends Component<Props> {

    node: any
    canvas: any

    componentDidMount() {

        const oldLogFunction = console.warn;
        console.warn = function(){};
        this.node = document.getElementById(this.props.parentID);

        const THREE = require('three');
        const STLLoader = require('three-stl-loader')(THREE);
        const OrbitControls = require('three-orbit-controls')(THREE);
        const scene = new THREE.Scene();

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        this.canvas=renderer.domElement;
        renderer.setClearColor( 0x000000, 0 ); // the default
        // renderer.setSize( window.innerWidth, window.innerHeight );

        renderer.setSize( this.node.offsetWidth, 300 );

        const camera = new THREE.PerspectiveCamera( 70, 2, 0.1, 1000 );
        // camera.position.set(2, 0, 5)
        // camera.position.set(1, 0, 5)
        camera.position.set(0,0,0)
        camera.lookAt(new THREE.Vector3())

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.rotateSpeed = 0.05;
        controls.dampingFactor = 0.15;
        controls.enableZoom = true;
        controls.zoomSpeed = 0.25;
        controls.autoRotate = true;
        controls.autoRotateSpeed = .5;
        controls.maxDistance = 5.0;
        controls.minDistance = 3.0;

        // append the renderer to the node
        this.node?.appendChild(renderer.domElement)

        const loader = new STLLoader()
        loader.load(process.env.PUBLIC_URL + '/centered.stl', function (geometry: any) {
            const material = new THREE.MeshNormalMaterial()
            const mesh = new THREE.Mesh(geometry, material)
            const middle = new THREE.Vector3();
            geometry.computeBoundingBox();
            geometry.boundingBox.getCenter(middle);
            mesh.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(
                -middle.x, -middle.y, -middle.z ) );
            mesh.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2));

            scene.add(mesh)
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
export default Brain3D;