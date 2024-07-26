const receiptState = {
  addReceiptData: null,
  addReceiptError: null,
  listReceipts: null,
  getReceiptsError: null,
  selectedReceipt: null,
  receiptSortBy: null,
  receiptFilter: null,
  receiptDetail: null,
  receiptDetailError: null,
  receiptPage: null,
};

function receiptsReducer(state = receiptState, action) {
  switch (action.type) {
    case 'GET_RECEIPTS_SUCCESS':
      return {
        ...state,
        listReceipts: action.payload?.result,
        receiptFilter: action.filter,
        receiptSortBy: action.sortBy,
        receiptPage: action.payload?.pageDetail,
        getReceiptsError: null,
      };
    case 'GET_RECEIPTS_FAIL':
      return {
        ...state,
        listReceipts: null,
        getReceiptsError: action.error,
        receiptPage: null,
      };
    case 'POST_RECEIPT_SUCCESS':
      return {
        ...state,
        addReceiptData: action.payload,
        addReceiptError: null,
      };
    case 'RECEIPT_PRODUCT_SUCCESS':
      return {
        ...state,
        receiptDetail: action.payload,
        receiptDetailError: null,
      };
    case 'RECEIPT_PRODUCT_FAIL':
      return {
        ...state,
        receiptDetail: null,
        receiptDetailError: action.error,
      };
    case 'POST_RECEIPT_FAIL':
      return {
        ...state,
        addReceiptData: null,
        addReceiptError: action.error,
      };
    case 'SELECT_RECEIPT':
      return {
        ...state,
        selectedReceipt: action?.receipt,
      };
    case 'RESET_RECEIPT_FILTER':
      return {
        ...state,
        receiptFilter: null,
      };
    case 'CLEAR_RECEIPT_STATE':
      return {
        ...receiptState,
        selectedReceipt: state?.selectedReceipt,
      };
    default:
      return state;
  }
}

export default receiptsReducer;
