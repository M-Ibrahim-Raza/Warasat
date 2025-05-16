import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAmount, setFuneralExpenses, setMehr, setDebt, setWill } from "../store/detailsSlice";
import {
  updateHeirList,
  decrementHeirVal,
  deleteHeir,
} from "../store/heirsSlice";
import { Link } from "react-router-dom";
import {
  common_heirs,
  children_heirs_grouped,
  sibling_heirs,
  spouse_heir,
  heir_types,
  parent_heirs_grouped,
} from "../data/HeirsData";
import { capitalizeWords } from "@/Utilities/utilities";
import Heading from "../../Components/Heading";
import DetailsDisplay from "../../Components/DetailsDisplay";
import Button from "../../Components/Button";
import HeirInput from "../../Components/HeirInput";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import HeirButton from "@/../Components/HeirButton";

export const CalculateHeirs = () => {
  const dispatch = useDispatch();
  const [heirType, setHeirType] = useState("");
  const amount = useSelector((state) => state.details.amount);
  const funeralExpenses = useSelector((state) => state.details.funeralExpenses);
  const distributionMethod=useSelector((state)=>state.options.distributionMethod)
  const mehr = useSelector((state) => state.details.mehr);
  const debt = useSelector((state) => state.details.debt);
  const will = useSelector((state) => state.details.will);
  const currency = useSelector((state) => state.details.currency);
  const gender = useSelector((state) => state.options.gender);
  const heirList = useSelector((state) => state.heirs.heirList);

  if (distributionMethod=="percentage"){
    dispatch(setAmount(100))
  }

  console.log(distributionMethod)
  const total_amount = amount - funeralExpenses - mehr - debt - will;

  const common_heirs_filtered = common_heirs.filter(
    (heir) => !(heir["relation"] === (gender === "male" ? "husband" : "wife"))
  );

  const spouse_heir_filtered = spouse_heir.filter(
    (heir) => !(heir["relation"] === (gender === "male" ? "husband" : "wife"))
  );

  const common_heirs_groups = common_heirs_filtered.reduce(
    (common_heirs_groups, heir, ind) => {
      if (ind % 5 === 0) {
        common_heirs_groups.push(common_heirs_filtered.slice(ind, ind + 5));
      }
      return common_heirs_groups;
    },
    []
  );

  return (
    <>
      <Heading className="w-[35rem]">Islamic Inheritance Calculator</Heading>
      <div
        id="asset-screen"
        className="bg-white/60 px-4 rounded-xl mt-4 mx-[25%] "
      >
        <Heading className="w-[13rem] text-xl !py-1.5">Asset Details</Heading>
        <div className="mt-4 pb-4">
          {(funeralExpenses !== "" ||
            mehr !== "" ||
            debt !== "" ||
            will !== "") && (
              distributionMethod==="amount"?
            <DetailsDisplay>
              <span>Total Asset</span>
              <span>
                {currency} {Number(amount).toLocaleString()}
              </span>
            </DetailsDisplay>:
              <DetailsDisplay>
                <span>Total Asset</span>
                <span>
                {`${Number(amount)} %`}
                </span>
              </DetailsDisplay>
          )}
          {funeralExpenses !== "" && (
            <DetailsDisplay className="text-TCR1 text-base">
              <span>Funeral & Burial Expenses</span>
              <span>
                -{currency} {Number(funeralExpenses).toLocaleString()}
              </span>
            </DetailsDisplay>
          )}
          {mehr !== "" && (
            <DetailsDisplay className="text-TCR1 text-base">
              <span>Haq Mehr</span>
              <span>
                -{currency} {Number(mehr).toLocaleString()}
              </span>
            </DetailsDisplay>
          )}
          {debt !== "" && (
            <DetailsDisplay className="text-TCR1 text-base">
              <span>Debt & Liabilities</span>
              <span>
                -{currency} {Number(debt).toLocaleString()}
              </span>
            </DetailsDisplay>
          )}
          {will !== "" && (
            distributionMethod==="amount"?
            <DetailsDisplay className="text-TCR1 text-base">
              <span>Will</span>
              <span>
                -{currency} {Number(will).toLocaleString()}
              </span>
            </DetailsDisplay>:
              <DetailsDisplay className="text-TCR1 text-base">
                <span>Will</span>
                <span>
                {`${Number(will)} %`}
                </span>
              </DetailsDisplay>
          )}
          <DetailsDisplay>
            <span>Asset To Be Distributed Among Heirs</span>
              {distributionMethod==="amount"?
            <span>
              {currency} {Number(total_amount).toLocaleString()}
            </span>
              :
            <span>
            {`${Number(total_amount)} %`}
            </span>}
          </DetailsDisplay>
        </div>
      </div>
      <div
        id="input-screen"
        className="bg-white/60 p-4 rounded-xl mt-4 mx-[5%] !pb-8"
      >
        <div className="flex-col justify-center align-middle">
          <div className="flex justify-center align-middle mb-2">
            <Drawer>
              <DrawerTrigger>
                <Button className="!py-2">Add Heir</Button>
              </DrawerTrigger>
              <DrawerContent
                heir_types={heir_types}
                selectedValue={heirType}
                setSelectedValue={setHeirType}
              >
                <div className="heir-container justify-center align-middle flex-col h-full flex my-6 mx-6 gap-y-6">
                  {(heirType === "Common Heirs" || heirType === "") &&
                    common_heirs_groups.map((current_group, group_ind) => {
                      return (
                        <div key={group_ind} className="row flex flex-1 gap-6">
                          {current_group.map((heir, ind) => {
                            return (
                              <HeirButton
                                onClick={() => {
                                  dispatch(updateHeirList(heir));
                                }}
                                key={group_ind * current_group.length + ind}
                                className="flex-1"
                              >
                                {capitalizeWords(heir["relation"])}
                              </HeirButton>
                            );
                          })}
                        </div>
                      );
                    })}

                  {heirType === "Parents" &&
                    parent_heirs_grouped.map((current_group, group_ind) => {
                      return (
                        <div
                          key={group_ind}
                          className="row flex basis-[28%] justify-center gap-16"
                        >
                          {current_group.map((heir, ind) => {
                            return (
                              <HeirButton
                                onClick={() => {
                                  dispatch(updateHeirList(heir));
                                }}
                                key={group_ind * current_group.length + ind}
                                className="basis-[25%]"
                              >
                                {capitalizeWords(heir["relation"])}
                              </HeirButton>
                            );
                          })}
                        </div>
                      );
                    })}

                  {heirType === "Children" &&
                    children_heirs_grouped.map((current_group, group_ind) => {
                      return (
                        <div
                          key={group_ind}
                          className="row flex basis-[28%] justify-center gap-16"
                        >
                          {current_group.map((heir, ind) => {
                            return (
                              <HeirButton
                                onClick={() => {
                                  dispatch(updateHeirList(heir));
                                }}
                                key={group_ind * current_group.length + ind}
                                className="basis-[25%]"
                              >
                                {capitalizeWords(heir["relation"])}
                              </HeirButton>
                            );
                          })}
                        </div>
                      );
                    })}

                  {heirType === "Siblings" && (
                    <div className="row flex basis-[28%] gap-6">
                      {sibling_heirs.map((heir, ind) => {
                        return (
                          <HeirButton
                            onClick={() => {
                              dispatch(updateHeirList(heir));
                            }}
                            key={ind}
                            className="flex-1"
                          >
                            {capitalizeWords(heir["relation"])}
                          </HeirButton>
                        );
                      })}
                    </div>
                  )}

                  {heirType === "Spouse" && (
                    <div className="flex basis-[28%] justify-center">
                      <HeirButton
                        onClick={() => {
                          dispatch(updateHeirList(spouse_heir_filtered[0]));
                        }}
                        className="basis-[18%]"
                      >
                        {capitalizeWords(spouse_heir_filtered[0]["relation"])}
                      </HeirButton>
                    </div>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <Heading className="w-[13rem] text-xl !py-1.5">Heir Details</Heading>
          <div className="flex-col flex mt-6 gap-2">
            {heirList.map((heir) => {
              return (
                <HeirInput
                  onDelete={() => {
                    dispatch(deleteHeir(heir));
                  }}
                  isSingle={heir["limit"] === 1 ? true : false}
                  onIncrement={() => {
                    heir["val"] < heir["limit"] &&
                      dispatch(updateHeirList(heir));
                  }}
                  val={heir["val"]}
                  onDecrement={() => {
                    {
                      console.log("Hi");
                    }

                    heir["val"] > 1
                      ? dispatch(decrementHeirVal(heir))
                      : dispatch(deleteHeir(heir));
                  }}
                >
                  {capitalizeWords(heir["relation"])}
                </HeirInput>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center">
          {heirList.length !== 0 && (
            <Link to="/inheritance-calculation">
              <Button className="mt-6 !py-2">Calculate Shares</Button>
            </Link>
          )}
        </div>
      </div>
      <div className="w-full h-16"></div>
    </>
  );
};
