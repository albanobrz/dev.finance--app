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

const transactions = [{
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
}]

const Transaction = {
    all: transactions,

    add(transaction) {
        Transaction.all.push(transaction)
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
    transactionsContainer: document.querySelector('#data-table'),

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

        document.querySelector('#expense-display').innerHTML =  Utils.formatCurrency(Transaction.expenses())

        document.querySelector('#total-display').innerHTML =  Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ''
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, '')

        value = Number(value) /100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
        console.log(signal, value)
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

Transaction.add({
    id: 39,
    description: 'cuan',
    amount: 200,
    date: '21/02/2022'
})
