import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent
  implements OnInit, OnDestroy, CanComponentDeactivate
{
  paramsSubscription: Subscription;
  server: { id: number; name: string; status: string; allowEdit: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changedSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.allowEdit = this.server.allowEdit === '1' ? true : false;
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
      this.allowEdit = this.server.allowEdit === '1' ? true : false;
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.server.allowEdit) {
      return true;
    }
    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changedSaved
    ) {
      return confirm('Do you want to discard this changes?');
    } else {
      return true;
    }
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changedSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
