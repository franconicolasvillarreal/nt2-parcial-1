<template>

  <section class="src-components-gastos">
    <div class="text-left ml-3"><h4>Tabla de gastos</h4></div>

    <div v-if="gastos.length">
      <div class="presupuesto col-6 text-left mt-3 mb-3">
        <label for="presupuesto">Presupuesto:</label>
        <input id="presupuesto" class="form-control col-6" type="text" v-model="presupuesto" />
      </div>
      

          <table class="table text-left">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Fecha</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Importe</th>
            </tr>
            <tr class=""
            v-for="(gasto, index) in gastos"
            :key="index">
                <td scope="col"><p>{{ gasto.id }}</p></td>
                <td scope="col"><p>{{ formatearFecha(gasto.createdAt) }}</p></td>
                <td scope="col"><p>{{ formatearDescripcion(gasto.nombre) }}</p></td>
                <td scope="col"><p>{{ formatearDescripcion(gasto.descripcion) }}</p></td>
                <td scope="col"><p>{{ formatearImporte(gasto.importe) }}</p></td>   
                <td scope="col"><button class="btn btn-danger" @click="deleteTareaAxios(gasto.id)">DEL</button></td>                       
            </tr>
            <tr>
              <td scope="col"></td>
              <td scope="col"></td>
              <td scope="col"></td>
              <td scope="col"></td>
              <td scope="col" :style="{
              'color': colorSubtotal(),
            }"><p>{{ formatearImporte(subtotal) }}</p></td>
              <td scope="col"></td>
            </tr>
          </table>
      
    </div>
    <h2 v-else class="alert alert-warning">No se encontraron gastos.</h2>
  </section>

</template>

<script>
  import filters from '../filters.js'
  export default  {
    name: 'src-components-gastos',
    props: [],
    mixins: [
      filters
    ],
    mounted () {
      this.getDatosFormAxios() 
    },
    data () {
      return {
        url : 'https://5f93837c8742070016da699e.mockapi.io/nt2-fvillarreal/parcial1-gastos/',
        gastos : [],
        subtotal: 0,
        presupuesto: 0
      }
    },
    methods: {

      colorSubtotal() {
        if(this.presupuesto < this.subtotal){
          return 'red';
        } else if(this.subtotal < 1000) {
          return 'green'
        } else if (this.subtotal >= 1000 && this.subtotal <= 5000) {
          return 'magenta'
        } else {
          return 'orange'
        }
        
      },
      calcularSubtotal() {
        this.subtotal = 0
        this.gastos.forEach(gasto => {
          this.subtotal += Number.parseFloat(gasto.importe)
        })
      
      },
      async getDatosFormAxios() {
            try {
              let res = await this.axios(this.url)
              console.log(res.data)
              this.gastos = res.data
              this.calcularSubtotal()
            }
            catch(error) {
              console.log('HTTP GET ERROR', error)
            }
        },
        deleteTareaAxios(id) {
          console.log('delete',id)

          this.axios.delete(this.url+id)
            .then(res => {
              let gasto = res.data
              console.log(gasto)
              let offset = this.gastos.findIndex(gasto => gasto.id == id)
              this.gastos.splice(offset,1)
              this.calcularSubtotal()
            })
            .catch(error => console.log('HTTP DELETE ERROR', error))
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-gastos {

  }
</style>
