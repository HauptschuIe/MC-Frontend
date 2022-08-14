import React, { Component } from 'react';
import { ItemTypes } from './tile-visualisation.js'
import { useDrop } from 'react-dnd'

export function Trashcan() {

    const [{isOver}, drop] = useDrop(
        () => ({
            accept: ItemTypes.VISUALIZATIONONSCREEN,
            collect: monitor => ({
                isOver: !!monitor.isOver()
            })
        }),
    )

    return (<div class="mainscreen" ref={drop}>
                <section id="trashcanAnimation">
                    <span class="trash">
                        <span style={{
                                        transform: isOver? "rotate(-45deg)" : "",
                                        transition: isOver? "transform 250ms" : ""
                                    }}></span>
                        <i></i>
                    </span>
                </section>
            </div>
        );
}