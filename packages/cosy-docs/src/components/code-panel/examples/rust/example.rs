use std::collections::HashMap;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct User {
    id: u64,
    name: String,
    email: Option<String>,
}

impl User {
    fn new(id: u64, name: String) -> Self {
        Self {
            id,
            name,
            email: None,
        }
    }
    
    fn with_email(mut self, email: String) -> Self {
        self.email = Some(email);
        self
    }
}

fn main() {
    let mut users: HashMap<u64, User> = HashMap::new();
    
    let user = User::new(1, "Alice".to_string())
        .with_email("alice@example.com".to_string());
    
    users.insert(user.id, user);
    
    println!("Users: {:#?}", users);
}