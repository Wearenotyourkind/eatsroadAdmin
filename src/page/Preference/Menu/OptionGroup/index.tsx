import React, { useState } from 'react';
import './index.scss';

import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '@redux';
import AddOptionGroup from './AddOptionGroup';
import {StoreAction} from "../../../../@redux/actions";

interface props {}
interface optionGroupTileProps {
  name: string;
  options: any[];
}

const OptionGroups: React.FC<props> = (props) => {
  const menu = useSelector((state: RootState) => state.Store.menu);
  const dispatch = useDispatch();


  const OptionGroupTile = (props: optionGroupTileProps) => {
      const [expand, setExpand] = useState(false);
      const handleOnclickDeleteOption=(optionName:string)=>{
          dispatch(StoreAction.deleteOptionFirebase(props.name,optionName))
      }
      const handleOnclickDeleteOptionGroup=(groupName:string)=>{
          dispatch(StoreAction.deleteOptionGroupFirebase(groupName))
      }

    return (
      <div className="OptionGroupTile">
        <div className="GroupName">
          <h3>{props.name}</h3>
          <button onClick={() => setExpand(!expand)}>
            {expand ? '접기' : '자세히 보기'}
          </button>
        </div>
        <div className={(expand ? '' : 'hide ') + 'OptionListContainer'}>
          {props.options.map((option) => {
            return (
                <>
                    <OptionTile
                        key={option.name}
                        name={option.name}
                        price={option.price}
                    />
                    <button
                        onClick={()=>{
                            handleOnclickDeleteOption(option.name);
                        }}
                    >삭제하기
                    </button>
                </>
            );
          })}
        </div>
          <button
              onClick={()=>{
                  console.log(props.name)
                  handleOnclickDeleteOptionGroup(props.name);
              }}
          >그룹 삭제하기
          </button>
      </div>
    );
  };

  const OptionTile = (props: any) => {
    return (
      <div className="option">
        <h4>{props.name}</h4>
        <p>{`${props.price}원`}</p>
      </div>
    );
  };

  return (
    <div className="OptionGroups">
      <div className="OptionGroupsHeader">
        <h3>옵션그룹 설정</h3>
        <AddOptionGroup />
      </div>
      <div className="OptionGroupsList">
        {menu.optionGroups.map((optionGroup) => {
          return (
            <OptionGroupTile
              key={optionGroup.name}
              name={optionGroup.name}
              options={optionGroup.options}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OptionGroups;
