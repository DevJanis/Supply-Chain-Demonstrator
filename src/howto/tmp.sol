// SPDX-License-Identifier: MIT

pragma solidity >0.5;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MyContract is Ownable {
    mapping(address => bool) public allowedEntryList;

    function addToList(address _allowedEntry) public onlyOwner {
        allowedEntryList[_allowedEntry] = true;
    }

    function showAllowedList(address _addrToCheck) public returns (bool) {
        return allowedEntryList[_addrToCheck];
    }

    modifier onlyAllowed() {
        require(
            allowedEntryList[_msgSender()] == true,
            "onlyAllowed: the caller is not granted access"
        );
        _;
    }

    struct DataType {
        address senderId;
        address[] authorisedIds;
        uint256 batchNumber;
        uint256[] prevOrderIds;
        uint256 shipmentDate;
        string workPerformed;
        string article;
        address receiverId;
        string deliveryConfirmation;
    }

    mapping(uint256 => DataType) table;

    function addRow(
        uint256 _orderId,
        uint256 _batchNumber,
        uint256[] memory _prevOrderId,
        uint256 _shipmentDate,
        string memory _workPerformed,
        string memory _article,
        address _receiverId
    ) public onlyAllowed {
        require(_orderId > 0);
        address _senderId = table[_orderId].senderId;
        require(_senderId == address(0));
        _senderId = msg.sender;
        string memory _deliveryConfirmation = "False";
        address[] memory _authorisedIds;
        uint256[] memory _prevOrderIds;
        for (uint256 i = 0; i < _prevOrderId.length; i++) {
            table[_orderId].prevOrderIds.push(_prevOrderId[i]);
            if (_prevOrderId[i] != 0) {
                for (
                    uint256 j = 0;
                    j < table[_prevOrderId[i]].prevOrderIds.length;
                    j++
                ) {
                    table[_orderId].prevOrderIds.push(
                        table[_prevOrderId[i]].prevOrderIds[j]
                    );
                }
                for (
                    uint256 k = 0;
                    k < table[_prevOrderId[i]].authorisedIds.length;
                    k++
                ) {
                    table[_orderId].authorisedIds.push(
                        table[_prevOrderId[i]].authorisedIds[k]
                    );
                }
            }
        }

        _prevOrderIds = table[_orderId].prevOrderIds;
        _authorisedIds = table[_orderId].authorisedIds;

        table[_orderId] = DataType(
            _senderId,
            _authorisedIds,
            _batchNumber,
            _prevOrderIds,
            _shipmentDate,
            _workPerformed,
            _article,
            _receiverId,
            _deliveryConfirmation
        );
        table[_orderId].authorisedIds.push(_senderId);
        table[_orderId].authorisedIds.push(_receiverId);
    }

    function getRow(uint256 _orderId)
        public
        view
        returns (
            address _senderId,
            address[] memory _authorisedIds,
            uint256 _batchNumber,
            uint256[] memory _prevOrderIds,
            uint256 _shipmentDate,
            string memory _workPerformed,
            string memory _article,
            address _receiverId,
            string memory _deliveryConfirmation
        )
    {
        _senderId = table[_orderId].senderId;
        _authorisedIds = table[_orderId].authorisedIds;
        _batchNumber = table[_orderId].batchNumber;
        _prevOrderIds = table[_orderId].prevOrderIds;
        _shipmentDate = table[_orderId].shipmentDate;
        _workPerformed = table[_orderId].workPerformed;
        _article = table[_orderId].article;
        _receiverId = table[_orderId].receiverId;
        _deliveryConfirmation = table[_orderId].deliveryConfirmation;
    }

    function changeRow(uint256 _orderId, string memory _deliveryConfirmation)
        public
    {
        require(_orderId > 0, "keine gueltige orderId");
        address _receiverId = table[_orderId].receiverId;
        require(msg.sender == _receiverId);

        address _senderId = table[_orderId].senderId;
        address[] memory _authorisedIds = table[_orderId].authorisedIds;
        uint256 _batchNumber = table[_orderId].batchNumber;
        uint256[] memory _prevOrderIds = table[_orderId].prevOrderIds;
        uint256 _shipmentDate = table[_orderId].shipmentDate;
        string memory _workPerformed = table[_orderId].workPerformed;
        string memory _article = table[_orderId].article;
        table[_orderId] = DataType(
            _senderId,
            _authorisedIds,
            _batchNumber,
            _prevOrderIds,
            _shipmentDate,
            _workPerformed,
            _article,
            _receiverId,
            _deliveryConfirmation
        );
    }
}
