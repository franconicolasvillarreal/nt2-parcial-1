<template>

  <section class="src-components-formulario">
    <div class="text-left ml-3"><h4>Agregar gasto</h4></div>

    <form novalidate autocomplete="off" class="p-3 mt-3 text-left" @submit.prevent="enviar()">
      <div class="form-group  col-4">
          <label for="nombre">Nombre</label>
          <input 
            type="text"
            id="nombre"
            class="form-control"
            v-model="$v.f.nombre.$model"
          >
          <div v-if="$v.f.nombre.$error && $v.f.nombre.$dirty" class="alert alert-danger mt-1">
            <div v-if="$v.f.nombre.required.$invalid">Este campo es requerido</div>
            <div v-if="$v.f.nombre.minLength.$invalid">Este campo debe tener al menos {{$v.f.nombre.minLength.$params.min}} caracteres</div>
                    <div v-if="$v.f.nombre.maxLength.$invalid">Este campo debe tener máximo {{$v.f.nombre.maxLength.$params.max}} caracteres</div>
          </div>
      </div>
          
          <div class="form-group  col-4">
                <label for="descripcion">Descripción</label>
                <input 
                    type="text-area"
                    id="descripcion"
                    class="form-control"
                    v-model="$v.f.descripcion.$model"
                >
                <div v-if="$v.f.descripcion.$error && $v.f.descripcion.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.descripcion.required.$invalid">Este campo es requerido</div>
                </div>

                <div class="form-group">
                <label for="importe">Importe</label>
                <input 
                    type="number"
                    id="importe"
                    class="form-control"
                    v-model="$v.f.importe.$model"
                >
                <div v-if="$v.f.importe.$error && $v.f.importe.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.importe.required.$invalid">Este campo es requerido</div>
                    <div v-if="$v.f.importe.between">El importe ingresado no es válido.</div>
                </div>
          </div>
          </div>
          <div class="form-group col-4">
                <input 
                    type="submit"
                    :disabled="false"
                    class="btn btn-info mt-4"
                    value="Agregar"
                >
          </div>
     
    </form>
  </section>

</template>

<script>
  import { required, minLength, maxLength, between } from '@vuelidate/validators'

  export default  {
    name: 'src-components-formulario',
    props: [],
    mounted () {
      this.resetForm()
    },
    data () {
      return {
          f: this.resetForm(),
          url : 'https://5f93837c8742070016da699e.mockapi.io/nt2-fvillarreal/parcial1-gastos/'
      }
    },
    validations: {
      f: {
        nombre: { 
          required,
          minLength: minLength(5),
          maxLength: maxLength(15)
        },
        descripcion: { 
          required
        },
        importe: {
          required,
          between: between(0,9999999999999999999)
        }
      }
    },
    methods: {

      async sendDatosFormAxios(datos) {
            
            try {
              if(datos){
                let res = await this.axios.post(this.url, datos, {'content-type': 'application/json'})
                console.log(res.data)
              }
            }
            catch(error) {
              console.log('HTTP POST ERROR', error)
            }
        },
        async getDatosFormAxios() {
            try {
              let res = await this.axios(this.url)
              console.log(res.data)
            }
            catch(error) {
              console.log('HTTP GET ERROR', error)
            }
        },
        enviar() {
            this.$v.$touch()
            if(!this.$v.$invalid) {
              let form = {
                nombre: this.$v.f.nombre.$model,
                importe: this.$v.f.importe.$model,
                descripcion: this.$v.f.descripcion.$model
              }
              console.log(form)
              this.sendDatosFormAxios(form)
              this.f = this.resetForm()
              this.$v.$reset()
            }
        },
        resetForm() {
         
            return {
               nombre: '',
               descripcion : '',
               importe : ''
            }
        }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-formulario {

  }
</style>
