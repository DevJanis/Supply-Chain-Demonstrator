export const CONTRACT_ADDRESS = '0x22a60d0E1D7187Ae34F9bF5e174e37F1D4D2a154'
export const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_orderId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_batchNumber",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "_prevOrderId",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256",
                "name": "_shipmentDate",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_workPerformed",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_article",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_receiverId",
                "type": "address"
            }
        ],
        "name": "addRow",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_allowedEntry",
                "type": "address"
            }
        ],
        "name": "addToList",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowedEntryList",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_orderId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_deliveryConfirmation",
                "type": "string"
            }
        ],
        "name": "changeRow",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_orderId",
                "type": "uint256"
            }
        ],
        "name": "getRow",
        "outputs": [
            {
                "internalType": "address",
                "name": "_senderId",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "_authorisedIds",
                "type": "address[]"
            },
            {
                "internalType": "uint256",
                "name": "_batchNumber",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "_prevOrderIds",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256",
                "name": "_shipmentDate",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_workPerformed",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_article",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_receiverId",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_deliveryConfirmation",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_addrToCheck",
                "type": "address"
            }
        ],
        "name": "showAllowedList",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]