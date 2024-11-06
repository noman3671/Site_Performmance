import SaddleTest from "assets/test/saddle_test.png"
import tw, {css} from "twin.macro";
import Divider from "components/Common/Divider";
import Button from "components/Buttons";
import {HeartIcon, UploadSaddleIcon} from "components/Icons";
import React, {useMemo, useState} from "react";
import S3ImageWrapper from "components/Wrapper/S3ImageWrapper";
import {MAX_ITEMS_IN_CART, useSaddleStore} from "store/SaddleStore";
import {StepperField} from "@aws-amplify/ui-react";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({item: {
    saddle: item
} = {}}) => {
    const [hoverState, setHoverState] = useState(false);
    const {cart: {
        items
    }, action} = useSaddleStore();
    const itemsInCartCount = useMemo(() => items.length, [items.length]);
    const currentItemsInCartCount = useMemo(() => items.filter(i => i.id === item.id).length, [items.length]);

    const handleOnCartCountChange = (newValue) => {
        if (newValue > currentItemsInCartCount) {
            for(var i = 0; i < newValue - currentItemsInCartCount; i++) {
                if (itemsInCartCount >= 10) {
                    return alert('Max 10 items in cart');
                }
                action({'type': 'addProductToCart', payload: {...item}})
            }
        } else if (newValue < currentItemsInCartCount){
            for(var i = 0; i < currentItemsInCartCount - newValue; i++) {
                action({'type': 'removeItemFromCartById', payload: item.id})
            }
        }
    };


    const onClickBuyHandler = () => {
        if (items.length >= 10) {
            alert(`Max 10 items in cart`);
            return;
        }
        action({'type': 'addProductToCart', payload: {...item}})
    };

    const onClickFavouriteHandler = () => {
        alert('Favourite')
    };

    return <div css={[style]} onMouseEnter={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)}
                className={'flex w-[450px] p-[10px] !pr-[14px] h-[245px]'}>
        <div css={[imageStyle]} className="size-[176px]">
            {/*<img src={SaddleTest} className={"size-[176px] object-contain max-w-none rounded-[16px]"}/>*/}
            {item.photo ? <S3ImageWrapper imgKey={item.photo} className={"w-full h-full object-contain max-w-none rounded-[16px]"}/> :
                <div css={[placeholderImageStyles]}><UploadSaddleIcon viewBox={{width: '30px', height: '30px'}}/></div>
            }
        </div>
        <div className="flex flex-col ml-[19px]">
            <h3 className={'saddle-title mb-[12px]'}>{item.brandName}</h3>
            <Divider/>
            <div className="horse-list-item-info">
                <div className="horse-list-item-info__wrapper flex py-[14px] justify-between">
                    <div className="b-item-info-head">
                        <span className={'b-item-info-span'}>Size </span>
                        <span className={'b-item-info-span'}>Cost</span>
                        {/*<span className={'b-item-info-span'}>Saddle fit score</span>*/}
                    </div>
                    <div className="b-item-info-body">
                        <span className={'b-item-info-span'}>{item.size}</span>
                        <span className={'b-item-info-span'}>${item.price}</span>
                        {/*<span className={'b-item-info-span'}>98%</span>*/}
                    </div>
                </div>
                <div className="flex gap-[18px] items-end mt-auto">
                    {
                        currentItemsInCartCount === 0 ? <Button onClick={onClickBuyHandler} className={"b-button w-[131px]"} primary={hoverState}
                                                         primaryOutline={!hoverState}>Buy</Button>
                            : <StepperField
                                max={(MAX_ITEMS_IN_CART - itemsInCartCount) + currentItemsInCartCount}
                                value={currentItemsInCartCount}
                                labelHidden
                                onStepChange={handleOnCartCountChange}
                            />
                    }
                    <HeartIcon onClick={onClickFavouriteHandler} className={'heart-icon hover:opacity-60 cursor-pointer !mb-[13px]'}
                               viewBox={{width: '30px', height: '30px'}}/>
                </div>
            </div>
        </div>
    </div>
}

const style = css`
  border-radius: 25px;
  background: #FFF;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 17px 29.2px 0px rgba(0, 0, 0, 0.12);
    transition: all .2s;
  }

  .saddle-title {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-spacing: normal;
  }

  .b-item-info-head {
    ${tw`flex flex-col`};
    foo: bar;
  }

  .horse-list-item-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
  }

  .b-item-info-body {
    ${tw`inline-flex flex-col`}
    min-width: 0;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-end;
    display: inline-flex;
  }

  .b-item-info-span {
    color: var(--color-text);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 175% */
  }

  .heart-icon {
    width: 30px !important;
    height: 30px !important;
    fill: var(--color-primary);

    > * {
      fill: var(--color-primary);
    }
  }
  
  .amplify-stepperfield {
    .amplify-button {
      background: var(--color-secondary);
      color: white;
      padding: 0 8px;
    }
    .amplify-field-group {
      width: 131px;
    }
    input {
      padding: 8px 0;
      height: 56px;
    }
  }
`

const imageStyle = css`
  border-radius: 16px;
  border: 1px solid var(--color-gray);
`

const placeholderImageStyles = css`
  background: var(--color-gray);
  width: 100%;
  height: 100%;
  border-radius: 16px;
  svg {
    width: 30px;
    height: 30px;
    translate: 250% 250%;
    transform: scale(5);
  }
`