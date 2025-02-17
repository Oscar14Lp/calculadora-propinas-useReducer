import { Dispatch } from "react"
import { formarCurrency } from "../helpers"
import { OrderActions } from "../reducers/order-reducer"
import { OrderItem } from "../types"

type OrderContentsProps = {
    order: OrderItem[],
    dispatch: Dispatch<OrderActions>
}


export default function OrderContents({ order, dispatch }: OrderContentsProps) {
    return (
        <div>
            <h2 className=' font-black text-4xl'> Consumo </h2>

            <div className=" space-y-3 mt-10">
                {order.map(item => (
                    <div key={item.id}
                        className="flex justify-between items-center border-t border-sky-900 py-5 last-of-type:border-b"
                    >
                        <div>
                            <p className=" text-lg">
                                {item.name} - {formarCurrency(item.price)}
                            </p>
                            <p className=" font-black">
                                Cantidad: {item.quantity} - {formarCurrency(item.price * item.quantity)}
                            </p>
                        </div>

                        <button className=" bg-red-500 h-8 w-8 rounded-full text-white font-black "
                            onClick={() => dispatch({ type: 'remove-item', payload: { id: item.id } })}
                        >
                            X
                        </button>

                    </div>
                ))
                }
            </div>
        </div>
    )
}
