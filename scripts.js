const Modal = {
    open() {
        //abrir modal
        //adicionar a class active ao modal
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close() {
        //fechar modal
        //remover a class active no modal
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}


const Transaction = {
    all: transactions = [{
        id: 1,
        description: 'Luz',
        amount: -50000,  // macete quando trabalha com dinheiro
        date: '23/01/2021'
    }, {
        id: 2,
        description: 'Website',
        amount: 500000,  // macete quando trabalha com dinheiro
        date: '23/01/2021'
    }, {
        id: 3,
        description: 'Internet',
        amount: -20000,  // macete quando trabalha com dinheiro
        date: '23/01/2021'
    }],

    add(transaction) {
        Transaction.all.push(transaction)
        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        let income = 0
        // pegar todas as transações
        // para cada transação
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount
            }
        })

        return income
    },
    expenses() {
        // somar as saídas
        let expense = 0
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount
            }
        })
        return expense
    },
    total() {
        // entradas - saídas
        return Transaction.incomes() + Transaction.expenses()
    }
}

// colocar os dados do javascript no html
const DOM = {
    transactionsContainer: document.querySelector('#container'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

    // está montando o html
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td><img src="./assets/minus.svg" alt="símbolo de menos, remoção"></td>
    `
        return html
    },

    updateBalance() {
        document.querySelector('#income-display').innerHTML = Utils.formatCurrency(Transaction.incomes())

        document.querySelector('#expense-display').innerHTML = Utils.formatCurrency(Transaction.expenses())

        document.querySelector('#total-display').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ''
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, '')

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
        console.log(signal, value)
    },
    formatAmount(value) {
        //tirar virgula e ponto do input do usuario
        value = Number(value.replace(/\,\./g, '')) * 100
        return value
    },
    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}` 
    }
}

const Form = {
    description: document.querySelector('#description'),
    amount: document.querySelector('#amount'),
    date: document.querySelector('#date'),
    

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        const { description, amount, date } = Form.getValues()

        if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
            throw new Error("Por favor preencha todos os campos")
        }
    },

    formatData() {
        let { description, amount, date } = Form.getValues()
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)
        
        return {
            description,
            amount,
            date
        }
    },

    saveTransaction(transaction) {
        Transaction.add(transaction)
    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            //verificar se todas as informações foram preenchidas
            Form.validateFields()
            // formatar os dados para salvar
            const transaction = Form.formatData()
            // salvar
            Form.saveTransaction(transaction)
            // apagar os dados do formulário
            Form.clearFields()
            // fechar modal
            Modal.close()
            

        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init() {

        // DOM.addTransaction(transactions[0])
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

App.init()
