<?php

namespace App\Enums;

enum StatusEnum:string {
    case Pending = 'Pending';
    case Active = 'Active';
    case Completed = 'Completed';
}
