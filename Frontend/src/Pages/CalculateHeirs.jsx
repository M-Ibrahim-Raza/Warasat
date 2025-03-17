import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  heirs,
  common_heirs,
  parent_heirs,
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
  const [heirType, setHeirType] = useState("");
  const [val, setVal] = useState(1);
  const [heirList, setHeirList] = useState([]);
  const amount = useSelector((state) => state.details.amount);
  const funeralExpenses = useSelector((state) => state.details.funeralExpenses);
  const mehr = useSelector((state) => state.details.mehr);
  const debt = useSelector((state) => state.details.debt);
  const will = useSelector((state) => state.details.will);
  const currency = useSelector((state) => state.details.currency);
  const gender = useSelector((state) => state.options.gender);

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
            <DetailsDisplay>
              <span>Total Asset Amount</span>
              <span>
                {currency} {Number(amount).toLocaleString()}
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
            <DetailsDisplay className="text-TCR1 text-base">
              <span>Will</span>
              <span>
                -{currency} {Number(will).toLocaleString()}
              </span>
            </DetailsDisplay>
          )}
          <DetailsDisplay>
            <span>Asset Amount To Be Distributed Among Heirs</span>
            <span>
              {currency} {Number(total_amount).toLocaleString()}
            </span>
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
                                  setHeirList((prev) => {
                                    const exists = prev.some(
                                      (h) => h.relation === heir.relation
                                    );

                                    return exists
                                      ? heir["limit"] === 1
                                        ? prev
                                        : prev.map((h) =>
                                            h.relation === heir.relation
                                              ? { ...h, val: h.val + 1 }
                                              : h
                                          )
                                      : [...prev, { ...heir, val: 1 }];
                                  });
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
                                  setHeirList((prev) => {
                                    const exists = prev.some(
                                      (h) => h.relation === heir.relation
                                    );

                                    return exists
                                      ? heir["limit"] === 1
                                        ? prev
                                        : prev.map((h) =>
                                            h.relation === heir.relation
                                              ? { ...h, val: h.val + 1 }
                                              : h
                                          )
                                      : [...prev, { ...heir, val: 1 }];
                                  });
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
                                  setHeirList((prev) => {
                                    const exists = prev.some(
                                      (h) => h.relation === heir.relation
                                    );

                                    return exists
                                      ? heir["limit"] === 1
                                        ? prev
                                        : prev.map((h) =>
                                            h.relation === heir.relation
                                              ? { ...h, val: h.val + 1 }
                                              : h
                                          )
                                      : [...prev, { ...heir, val: 1 }];
                                  });
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
                              setHeirList((prev) => {
                                const exists = prev.some(
                                  (h) => h.relation === heir.relation
                                );

                                return exists
                                  ? heir["limit"] === 1
                                    ? prev
                                    : prev.map((h) =>
                                        h.relation === heir.relation
                                          ? { ...h, val: h.val + 1 }
                                          : h
                                      )
                                  : [...prev, { ...heir, val: 1 }];
                              });
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
                          setHeirList((prev) => {
                            const exists = prev.some(
                              (h) =>
                                h.relation === spouse_heir_filtered[0].relation
                            );

                            return exists
                              ? spouse_heir_filtered[0]["limit"] === 1
                                ? prev
                                : prev.map((h) =>
                                    h.relation ===
                                    spouse_heir_filtered[0].relation
                                      ? { ...h, val: h.val + 1 }
                                      : h
                                  )
                              : [
                                  ...prev,
                                  { ...spouse_heir_filtered[0], val: 1 },
                                ];
                          });
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
                    setHeirList((prev) =>
                      prev.filter((h) => h["relation"] !== heir["relation"])
                    );
                  }}
                  isSingle={heir["limit"] === 1 ? true : false}
                  onIncrement={() => {
                    heir["val"] < heir["limit"] &&
                      setHeirList((prev) =>
                        prev.map((h) =>
                          h === heir ? { ...h, val: h.val + 1 } : h
                        )
                      );
                  }}
                  val={heir["val"]}
                  onDecrement={() => {
                    heir["val"] > 1
                      ? setHeirList((prev) =>
                          prev.map((h) =>
                            h === heir ? { ...h, val: h.val - 1 } : h
                          )
                        )
                      : setHeirList((prev) =>
                          prev.filter((h) => h["relation"] !== heir["relation"])
                        );
                  }}
                >
                  {capitalizeWords(heir["relation"])}
                </HeirInput>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full h-16"></div>
    </>
  );
};
