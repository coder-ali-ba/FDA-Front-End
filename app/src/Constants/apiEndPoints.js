const endPoints = {
    createResEndPoint : "restaurant/create",
    getResEndPoint : "restaurant/getall",
    deleteResEndPoint : "restaurant/delete",
    editResEndPoint : "restaurant/edit",
    approveResEndPoint :"restaurant/approve",
    addPhoto :"image/upload",
    getAllNames : "restaurant/rests-names",
    addmenuEndpoint :"restaurant/create-menu",
    getApprovedRestaurant : "restaurant/getapproved",
    getMyData : 'admin/getmydata',


    //Admin
    getAdminEndPoint : "admin/allrestaurants",
    approveEndPoint : 'admin/approve-restaurant',
    getAllCustomers : 'admin/getall-customers',
    allVendors : "admin/getall-vendors",
    changeCustomerStatus :'admin/changestatus',
    changeVendorStatus : 'admin/changeVendorstatus',

    //Menu
    getAllMenues : "menu/getall",
    adminMenues : "menu/getforadmin",
    deleteMenu : "menu/delete",
    menuActivate : "menu/changestatus",


    //Client
    approvedMenu : "menu/getapprovedmenu",
    placeOrder : "order/placeorder",
    getSingleRest : "restaurant/getsinglerest",
    multipleOrders : "order/placemultipleorder",
    getMyOrders : "order/myOrders",
    orderTomyRest : "order/orderForvendor",
    acceptOrder : "order/orderaccept",
    cancelOrder : "order/ordercancel",
    deliverOrder : 'order/handleDelivered',
    allOrders : "order/allorder",
    

}
export default endPoints