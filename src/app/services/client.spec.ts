import { TestBed } from '@angular/core/testing';
import { ClientService } from './client.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { Client } from '../models/client';

describe('Client', () => {
  let service: Client;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Client);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
