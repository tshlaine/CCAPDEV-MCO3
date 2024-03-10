db.dropDatabase()
                .then(result => {
                    console.log('Database deleted successfully');
                })
                .catch(err => {
                    console.error('Error deleting database:', err);
                });