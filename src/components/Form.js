function Form ({sendMsg}) {
    return (
        <form onSubmit={sendMsg}>
            <input onChange={console.log('typing')}></input>
            <button>
                Send
            </button>
        </form>
    )
}

export default Form