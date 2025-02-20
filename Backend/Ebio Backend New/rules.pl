% Main inheritance calculator rule triggered from python 
inheritance_calculator(TotalWealth, HasHusband, NumWives, NumSons, NumDaughters, NumSonsSons, NumSonsDaughters, HusbandShare, PerWifeShare, PerSonShare, PerDaughterShare, PerSonsDaughterShare) :-

    % Step 1: Calculate fixed shares for husband/wives
    calculate_fixed_shares(TotalWealth, HasHusband, NumWives, NumSons, NumDaughters, HusbandShare, TotalWivesShare, RemainingWealth1),

    % Step 2: Calculate per wife share
    calculate_individual_share(TotalWivesShare, NumWives, PerWifeShare),

    % Step 3: Daughters if no sons are present
    (NumSons =:= 0, NumDaughters > 0 ->
        (NumDaughters =:= 1 ->  % Only 1 daughter
            DaughtersShare1 is RemainingWealth1 / 2  % She gets 1/2
        ;
            DaughtersShare1 is (RemainingWealth1 * 2 / 3)  % More than 1 daughter, they get 2/3
        ),
        SonsShare1 = 0
    ;
        DaughtersShare1 = 0,
        SonsShare1 = 0
    ),

    % Step 4: Son's daughter
    RemainingWealth2 is RemainingWealth1 - DaughtersShare1,
    ( (NumSons > 0; NumSonsSons > 0; NumDaughters >= 2) ->  % No share
        SonsDaughtersShare = 0
    ;
        (NumDaughters =:= 1 ->  % 1 daughter present
            SonsDaughtersShare is RemainingWealth2 / 6  % 1/6 share
        ;
            (NumSonsDaughters =:= 1 ->
                SonsDaughtersShare is RemainingWealth2 / 2  % 1/2 if only one son's daughter
            ;
                (NumSonsDaughters >= 2 ->
                    SonsDaughtersShare is (RemainingWealth2 * 2 / 3)  % 2/3 if two or more
                ;
                    SonsDaughtersShare = 0
                )
            )
        )
    ),

    RemainingWealth3 is RemainingWealth2 - SonsDaughtersShare,

    % Step 5: Distribute remaining wealth among children if sons exist
    (NumSons > 0 ->
        calculate_children_shares(RemainingWealth3, NumSons, NumDaughters, FinalSonsShare, FinalDaughtersShare)
    ;
        FinalSonsShare = SonsShare1,
        FinalDaughtersShare = DaughtersShare1
    ),

    % Step 6: Distribute individual shares
    calculate_individual_share(FinalSonsShare, NumSons, PerSonShare),
    calculate_individual_share(FinalDaughtersShare, NumDaughters, PerDaughterShare),
    calculate_individual_share(SonsDaughtersShare, NumSonsDaughters, PerSonsDaughterShare).


% Calculate fixed shares for husband/wives and remaining wealth
calculate_fixed_shares(TotalWealth, HasHusband, NumWives, NumSons, NumDaughters, HusbandShare, TotalWivesShare, RemainingWealth) :-
    (HasHusband =:= 1 ->  % If husband is present
        (NumSons =:= 0, NumDaughters =:= 0 ->  % No children
            HusbandShare is TotalWealth / 2,  % Husband gets 1/2 if no children
            TotalWivesShare = 0,  % No wives if husband is present
            RemainingWealth is TotalWealth - HusbandShare
        ;
            HusbandShare is TotalWealth / 4,  % Husband gets 1/4 if children are present
            TotalWivesShare = 0,  % No wives if husband is present
            RemainingWealth is TotalWealth - HusbandShare
        )
    ;
        (NumWives > 0 ->  % If wives are present
            (NumSons =:= 0, NumDaughters =:= 0 ->  % No children
                TotalWivesShare is TotalWealth / 4,  % Wives get 1/4 if no children
                HusbandShare = 0,  % No husband
                RemainingWealth is TotalWealth - TotalWivesShare
            ;
                TotalWivesShare is TotalWealth / 8,  % Wives get 1/8 if children are present
                HusbandShare = 0,  % No husband
                RemainingWealth is TotalWealth - TotalWivesShare
            )
        ;
            % No husband or wives
            HusbandShare = 0,
            TotalWivesShare = 0,
            RemainingWealth = TotalWealth
        )
    ).

% Calculate shares for children
calculate_children_shares(TotalWealth, NumSons, NumDaughters, SonsShare, DaughtersShare) :-
    (NumSons > 0 ->
        TotalChildrenShares is NumSons * 2 + NumDaughters,  % Sons get 2 shares, daughters get 1
        SonsShare is TotalWealth * 2 / TotalChildrenShares * NumSons,
        DaughtersShare is TotalWealth / TotalChildrenShares * NumDaughters
    ;
        SonsShare = 0,
        DaughtersShare = 0
    ).

% Calculate individual shares
calculate_individual_share(TotalShare, Count, OneShare) :-
    (Count > 0 -> OneShare is TotalShare / Count ; OneShare = 0).


(children):- (NumSons =\= 0; NumDaughters =\= 0;NumSonsSons =\= 0; NumSonsDaughters =\= 0).




children - true - any variable has >0
children - false - all variables are 0

, - AND
; - OR