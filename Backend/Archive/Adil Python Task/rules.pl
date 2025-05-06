calculate_shares(TotalWealth, SonsShare, DaughtersShare) :-
    SonsShare is TotalWealth * 2 / 3,
    DaughtersShare is TotalWealth * 1 / 3.

calculate_individual_share(TotalShare, Count, OneShare) :-
    (Count > 0 -> OneShare is TotalShare / Count ; OneShare = 0).

inheritance_calculator(TotalWealth, NumSons, NumDaughters, PerSonShare, PerDaughterShare) :-
    calculate_shares(TotalWealth, SonsShare, DaughtersShare),
    calculate_individual_share(SonsShare, NumSons, PerSonShare),
    calculate_individual_share(DaughtersShare, NumDaughters, PerDaughterShare).
