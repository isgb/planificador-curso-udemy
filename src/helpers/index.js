export const formatearCantidad  = cantdidad =>{

    return Number(cantidad).toLocaleString('en-US',
    {
        style: 'currency',
        currency: 'USD'
    })
}