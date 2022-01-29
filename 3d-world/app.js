function main () {
    const canvas = document.querySelector('#c')

    const width = canvas.clientWidth
    const height = canvas.clientHeight

    const fov = 75
    const aspect = width / height
    const near = 0.1
    const far = 2000

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ canvas })

    new THREE.OrbitControls(camera, canvas)

    const scene = new THREE.Scene()
    const loader = new THREE.TextureLoader()
    //'https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg'
    const texture = loader.load (
        './IMG_20220129_162810_1.jpg',
        () => {
            const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
            rt.fromEquirectangularTexture(renderer, texture)
            scene.background = rt.texture
        }
    )

    function render () {
        const aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height, false)
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()
