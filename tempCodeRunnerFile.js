res.render('view-establishments', {
        studyFriendlyCafes: studyFriendlyCafes,
        budgetFriendlyCafes: budgetFriendlyCafes,
        cafes: cafes, // Pass all cafes
        topThreeCafes: topThreeCafes, // Pass the top three cafes
        username :username
    });