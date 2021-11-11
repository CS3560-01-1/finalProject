class OrderInformation:
    def __init__(self, orderNumber, subTotal, tax, orderTotal, customerName, dateAndTime):
        self._orderNumber = orderNumber
        self._subTotal = subTotal
        self._tax = tax
        self._orderTotal = orderTotal
        self._customerName = customerName
        self._dateAndTime = dateAndTime
