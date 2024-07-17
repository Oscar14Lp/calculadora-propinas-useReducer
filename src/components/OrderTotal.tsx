import { Dispatch, useMemo } from "react"
import { OrderItem } from "../types"
import { formarCurrency } from "../helpers"
import { OrderActions } from "../reducers/order-reducer"

type OrderTotalProps = {
    order: OrderItem[],
    tip: number,
    dispatch: Dispatch<OrderActions>
}

export default function OrderTotal({ order, tip, dispatch }: OrderTotalProps) {


    const subTotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

    const tipAmount = useMemo(() => subTotalAmount * tip, [tip, order])

    const totalAmount = useMemo(() => subTotalAmount + tipAmount, [tip, order])


    return (
        <>
            <div className=" space-y-3 ">
                <h2 className=" font-black text-2xl"> Total y Propina: </h2>
                <p>Subtotal a pagar: {''}
                    <span className=" font-bold">{formarCurrency(subTotalAmount)}</span>
                </p>
                <p>Propina: {''}
                    <span className=" font-bold">{formarCurrency(tipAmount)}</span>
                </p>
                <p>Total a pagar: {''}
                    <span className=" font-bold">{formarCurrency(totalAmount)}</span>
                </p>

            </div>

            <button
                className=" w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
                disabled={totalAmount === 0}
                onClick={() => dispatch({ type: 'place-order' })}
            >
                Guardar Orden
            </button>

        </>
    )
}
