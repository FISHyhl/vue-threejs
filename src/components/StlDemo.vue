<template>
  <div class="view-model">
    <div id="container" style="width: 100%;height: 100%;"></div>
  </div>
</template>

<script>
  import * as THREE from "three"
  import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'
  import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
  import { Loading } from 'element-ui';

  export default {
    name: "stldemo",
    data() {
      return {
        loadingInstance:"",
        camera: "",
        scene: "",
        renderer: "",
        mesh: "",
      }
    },
    mounted() {
      this.getType();
      // window.onresize = () => {
      //     this.onWindowResize();
      // };
    },
    methods: {
      getType() {
        this.loadingInstance =  Loading.service({
          lock: true,
          text: 'loading',
          spinner: 'el-icon-loading',
        });
        this.getScene();
        this.initControls();
        this.initStlModel();
      },
      getScene() {
        let container = document.getElementById('container')
        this.camera = new THREE.PerspectiveCamera(45, document.getElementById('container').clientWidth /
                document.getElementById('container').clientHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 20);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.scene = new THREE.Scene();


        var pointLight = new THREE.PointLight(0xcccccc);
        pointLight.position.set(0, 50, 1000);
        pointLight.castShadow = true;

        this.camera.add(pointLight);
        this.scene.add(this.camera);

        // 显示坐标系
        // var axes = new THREE.AxesHelper(50);
        // this.scene.add(axes)

        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setClearAlpha(0);
        //设置分辨率
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);
      },
      //加载stl文件
      initStlModel() {
        var loader = new STLLoader();
        loader.load("./Batman_01.stl", geometry => {
          this.loadingInstance.close();
          // 几何体居中
          geometry.center()
          let material = new THREE.MeshPhongMaterial();
          material.flatShading = THREE.FlatShading;
          // var points = new THREE.Points(geometry, material); //点模型对象
          // this.scene.add(points); //点对象添加到场景中
          this.mesh = new THREE.Mesh(geometry, material);
          this.mesh.position.set(0, -0.25, 1);
          this.scene.add(this.mesh);
          this.render();
        }, onprogress, onerror)

      },
      render() {
        this.renderer.render(this.scene, this.camera);
      },
      initControls() {

        var controls = new OrbitControls(this.camera, this.renderer.domElement);

        //解决选中时的边框问题
        this.renderer.domElement.removeAttribute("tabindex");
        // 如果使用animate方法时，将此函数删除
        controls.addEventListener('change', this.render);
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        controls.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        controls.enableZoom = true;
        //是否自动旋转
        // controls.autoRotate = true;
        // controls.autoRotateSpeed = 0.5;
        //设置相机距离原点的最远距离
        controls.minDistance = 1;
        //设置相机距离原点的最远距离
        controls.maxDistance = 200;
        //是否开启右键拖拽
        controls.enablePan = true;
      },
      // onWindowResize() {
      //     this.camera.aspect = window.innerWidth / window.innerHeight;
      //     this.camera.updateProjectionMatrix();
      //     this.render();
      //     this.renderer.setSize( window.innerWidth, window.innerHeight );
      // }
    }
  }
</script>

<style scoped>
  .view-model {
    height: 100%;
    width: 100%;
    position: relative;
    background: #A0A2A6;
  }
</style>