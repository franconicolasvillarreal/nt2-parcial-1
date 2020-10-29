export default  {
    methods : {
      formatearFecha : function(fyh) {
        return new Date(fyh).toLocaleString()
      },
      formatearImporte: function(importe){
        return "$" + importe
      },
      formatearDescripcion: function(descripcion){
        return descripcion.toUpperCase()
      }
    }
}