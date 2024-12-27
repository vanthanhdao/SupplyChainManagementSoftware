// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract OrderTrackingv2 {

    struct SubOrder{
        uint256 subOrderId;
        uint256 orderId;
        string[] subTimeLine;
        string subPurchaseOrder;
    }

    struct Order {
        uint256 orderId;
        string[] productList; 
        string[] material;
        string shipping;
        string[] history;
        string purchaseOrder;  
        string[] timeLine;              
    }
    // Mapping để lưu trữ các đơn hàng theo orderId
    mapping(uint256 => Order) private orders;
    mapping(uint256 => SubOrder) private suborders;

    // Sự kiện khi thêm đơn hàng mới
    event OrderCreated(uint256 orderId,string[] productList,string[] history,string[] timeLine,string po);
    event SubOrderCreated(uint256 subOrderId,uint256 orderId,string[] subTimeLine, string subpo );
    // Sự kiện khi thêm lịch sử vào đơn hàng
    event HistoryAdded(uint256 orderId, string historyEntry);
    event TimeLineAdded(uint256 orderId, string timeLineEntry);
    event SubTimeLineAdded(uint256 subOrderId, string subTimeLineEntry);
     event TimeLineBothAdded(uint256 orderId,uint256 subOrderId,string timeLineEntry, string subTimeLineEntry);
    event MaterialAdded(uint256 orderId, string materialEntry);
    event PurchaseOrderAdded(uint256 orderId, string purchaseOrderEntry);
    event ShippingAdded(uint256 orderId,string shippingEntry);
    event SubOrderManufacturerCreated(uint256 orderId, string historyEntry,string timeLineEntry,string[] materialEntry);
    event SubOrderCarrierCreated(uint256 orderId,string timeLine,string shippingEntry,string historyEntry);


    // Hàm lấy đơn hàng theo orderId
    function getOrder(uint256 _orderId) public view returns (uint256, string[] memory, string[] memory,
    string[] memory,string[] memory,string memory, string memory ) {
         require(orders[_orderId].orderId != 0, "Order not found");
        Order memory order = orders[_orderId];
        return (order.orderId, order.productList, order.history,order.material,
        order.timeLine,order.shipping,order.purchaseOrder);
    }

    function getSubOrder(uint256 _subOrderId) public view returns (uint256, uint256,
    string[] memory, string memory ) {
         require(suborders[_subOrderId].subOrderId != 0, "SubOrder1 not found");
        SubOrder memory subOrder = suborders[_subOrderId];
        return (subOrder.subOrderId, subOrder.orderId, subOrder.subTimeLine,subOrder.subPurchaseOrder);
    }

  
    function addOrderCustomer(uint256 _orderId, string[] memory _productList,
     string[] memory _history,string[] memory _timeLine ,string memory _po) public {
        // Tạo đơn hàng mới
        Order memory newOrder = Order({
            orderId: _orderId,
            productList: _productList,
            history: _history,
            material: new string[](0),
            shipping: new string(0),
            purchaseOrder: _po,
            timeLine: _timeLine
        });   
        // Lưu đơn hàng vào mapping
        orders[_orderId] = newOrder;
        // Phát sự kiện
        emit OrderCreated(_orderId,_productList,_history,_timeLine,_po);
    }


    function addSubOrderManufacturer(uint256 _orderId, uint256 _subOrderId,
    string[] memory _subTimeLine, string memory _subpo ,string[] memory _materialEntry,
    string memory _historyEntry, string memory _timeLine ) public {

        SubOrder memory newSubOrder = SubOrder({
            subOrderId:_subOrderId,
            orderId:_orderId,
            subTimeLine:_subTimeLine,
            subPurchaseOrder:_subpo
        });
        suborders[_subOrderId] = newSubOrder;
        // Phát sự kiện
        emit SubOrderCreated(_orderId,_subOrderId,_subTimeLine,_subpo);
        // Kiểm tra nếu đơn hàng không tồn tại
        require(orders[_orderId].orderId != 0, "Order not found");

        pushToHistory(_orderId, _historyEntry);
        pushToTimeLine(_orderId,_timeLine);

        for (uint i = 0; i < _materialEntry.length; i++) {
         if(bytes(_materialEntry[i]).length != 0 ) {
            pushToMaterial(_orderId, _materialEntry[i]); 
            }  
        }
        emit SubOrderManufacturerCreated(_orderId, _historyEntry,_timeLine,_materialEntry);
    }


    function addSubOrderCarrier(uint256 _orderId, uint256 _subOrderId,string[] memory _subTimeLine,
     string memory _subpo ,string memory _shippingEntry,
      string memory _timeLine ,string memory _historyEntry) public {

        SubOrder memory newSubOrder = SubOrder({
            subOrderId:_subOrderId,
            orderId:_orderId,
            subTimeLine:_subTimeLine,
            subPurchaseOrder:_subpo
        });

        suborders[_subOrderId] = newSubOrder;
        // Phát sự kiện
        emit SubOrderCreated(_orderId,_subOrderId,_subTimeLine,_subpo);

        // Kiểm tra nếu đơn hàng không tồn tại
        require(orders[_orderId].orderId != 0, "Order not found");

        pushToTimeLine(_orderId,_timeLine);

        pushToHistory(_orderId, _historyEntry);

        pushToShipping(_orderId, _shippingEntry);

        emit SubOrderCarrierCreated(_orderId,_timeLine,_shippingEntry,_historyEntry);
    }



    function pushToHistory(uint256 _orderId, string memory _historyEntry) public {
        // Kiểm tra nếu đơn hàng không tồn tại
        require(orders[_orderId].orderId != 0, "Order not found");
        // Kiểm tra trùng lặp trong mảng history
        string[] storage history = orders[_orderId].history;
        for (uint256 i = 0; i < history.length; i++) {
        if(keccak256(abi.encodePacked(history[i])) != keccak256(abi.encodePacked(_historyEntry))){
        // Thêm lịch sử vào mảng history của đơn hàng
        orders[_orderId].history.push(_historyEntry);
        // Phát sự kiện khi thêm lịch sử
        emit HistoryAdded(_orderId, _historyEntry);
        }
         }
    }


    function pushToTimeLine(uint256 _orderId, string memory _timeLineEntry) public {
        require(orders[_orderId].orderId != 0, "Order not found");
        if(bytes(_timeLineEntry).length != 0){
        orders[_orderId].timeLine.push(_timeLineEntry);
        emit TimeLineAdded(_orderId, _timeLineEntry);
        }
    }
     
    function pushToSubTimeLine(uint256 _subOrderId ,string memory _subTimeLineEntry) public {
        require(suborders[_subOrderId].orderId != 0, "SubOrder not found");
         if(bytes(_subTimeLineEntry).length != 0){
        suborders[_subOrderId].subTimeLine.push(_subTimeLineEntry);
        emit SubTimeLineAdded(_subOrderId, _subTimeLineEntry);
         }
    }

    function pushBothToTimeLine(uint256 _orderId,uint256 _subOrderId ,string memory _timeLineEntry,
    string memory _subTimeLineEntry) public {
        pushToTimeLine(_orderId, _timeLineEntry);
        pushToSubTimeLine(_subOrderId, _subTimeLineEntry);
        emit TimeLineBothAdded(_orderId,_subOrderId,_timeLineEntry, _subTimeLineEntry);
    }

    function pushToMaterial(uint256 _orderId, string memory _materialEntry) public {
        require(orders[_orderId].orderId != 0, "Order not found");
        orders[_orderId].material.push(_materialEntry);
        emit MaterialAdded(_orderId, _materialEntry);
    }

    function pushToShipping(uint256 _orderId, string memory _shippingEntry) public {
        require(orders[_orderId].orderId != 0, "Order not found");
        orders[_orderId].shipping = _shippingEntry;
        emit ShippingAdded(_orderId, _shippingEntry);
    }

  
}
