<template>

  <section class="src-components-choice">
    <div class="text-left ml-3 mb-3"><h4>Multiple Choice</h4></div>
    <table class="table text-left">
            <tr>
                <th scope="col">Pregunta</th>
                <th scope="col">Respuestas</th>
            </tr>

            <tr v-for="(pregunta, i) in preguntas" :key="i">
            <td>{{pregunta.pregunta}}</td>
            <td>{{pregunta.respuestas.join()}}</td>
          </tr>
          </table>
  </section>

</template>

<script>

  export default  {
    name: 'src-components-choice',
    props: [],
    mounted () {

    },
    data () {
      return {
        preguntas: [
          {pregunta: 1, respuestas: ['b', 'd']},
          {pregunta: 2, respuestas: ['b']},
          {pregunta: 3, respuestas: ['c']},
          {pregunta: 4, respuestas: ['d']},
          {pregunta: 5, respuestas: ['b','e']}
        ]
      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-choice {

  }
</style>
