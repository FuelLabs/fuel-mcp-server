# Example: sway_sources/sway/test/src/e2e_vm_tests/test_programs/should_pass/language/references/referencing_control_flow_expressions/src/main.sw

```sway
script;

fn test_referencing_break_return_unit() {
    while true {
        &break;
        assert(false);
    }

    while true {
        &mut break;
        assert(false);
    }
}

fn test_double_referencing_break_return_unit() {
    while true {
        & &break;
        assert(false);
    }

    while true {
        &mut &mut break;
        assert(false);
    }
}

fn test_referencing_break() -> u64 {
    while true {
        &break;
        assert(false);
    }

    while true {
        &mut break;
        assert(false);
    }

    42
}

fn test_double_referencing_break() -> u64 {
    while true {
        & &break;
        assert(false);
    }

    while true {
        &mut &mut break;
        assert(false);
    }

    42
}

fn test_referencing_continue() -> u64 {
    let mut i = 0;
    while i < 21 {
        i = i + 1;
        &continue;
        assert(false);
    }

    let mut i = 0;
    while i < 42 {
        i = i + 1;
        &mut continue;
        assert(false);
    }

    i
}

fn test_double_referencing_continue() -> u64 {
    let mut i = 0;
    while i < 21 {
        i = i + 1;
        & &continue;
        assert(false);
    }

    let mut i = 0;
    while i < 42 {
        i = i + 1;
        &mut &mut continue;
        assert(false);
    }

    i
}

fn test_referencing_return_return_unit() {
    while true {
        &return;
        assert(false);
    }
    
    assert(false);
}


fn test_referencing_return_mut_return_unit() {
    while true {
        &mut return;
        assert(false);
    }
    
    assert(false);
}

fn test_double_referencing_return_return_unit() {
    while true {
        & &return;
        assert(false);
    }
    
    assert(false);
}


fn test_double_referencing_return_mut_return_unit() {
    while true {
        &mut &mut return;
        assert(false);
    }
    
    assert(false);
}

fn test_referencing_return() -> u64 {
    while true {
        &return 42;
        assert(false);
    }
    
    assert(false);

    43
}

fn test_referencing_mut_return() -> u64 {
    while true {
        &mut return 42;
        assert(false);
    }
    
    assert(false);

    43
}

fn test_double_referencing_return() -> u64 {
    while true {
        & &return 42;
        assert(false);
    }
    
    assert(false);

    43
}

fn test_double_referencing_mut_return() -> u64 {
    while true {
        &mut &mut return 42;
        assert(false);
    }
    
    assert(false);

    43
}

fn main() -> u64 {
    test_referencing_break_return_unit();
    test_double_referencing_break_return_unit();

    assert(42 == test_referencing_break());
    assert(42 == test_double_referencing_break());
    
    assert(42 == test_referencing_continue());
    assert(42 == test_double_referencing_continue());

    test_referencing_return_return_unit();
    test_referencing_return_mut_return_unit();
    test_double_referencing_return_return_unit();
    test_double_referencing_return_mut_return_unit();

    assert(42 == test_referencing_return());
    assert(42 == test_referencing_mut_return());
    assert(42 == test_double_referencing_return());
    assert(42 == test_double_referencing_mut_return());

    42
}

```
